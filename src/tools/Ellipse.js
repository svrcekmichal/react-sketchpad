import { v4 } from 'uuid';

export const TOOL_ELLIPSE = 'ellipse';

export default (context) => {
  let ellipse = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    ellipse = {
      id: v4(),
      tool: TOOL_ELLIPSE,
      color,
      size,
      fill,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [ellipse];
  };

  const drawEllipsePolifyll = (centerX, centerY, radiusX, radiusY) => {
    let xPos;
    let yPos;
    let i = 0;
    for (i; i < 2 * Math.PI; i += 0.01) {
      xPos = centerX - (radiusY * Math.sin(i)) * Math.sin(0) + (radiusX * Math.cos(i)) * Math.cos(0);
      yPos = centerY + (radiusX * Math.cos(i)) * Math.sin(0) + (radiusY * Math.sin(i)) * Math.cos(0);
      if (i === 0) {
        context.moveTo(xPos, yPos);
      } else {
        context.lineTo(xPos, yPos);
      }
    }
  };

  const drawEllipse = (item, mouseX, mouseY) => {
    const startX = mouseX < item.start.x ? mouseX : item.start.x;
    const startY = mouseY < item.start.y ? mouseY : item.start.y;
    const endX = mouseX >= item.start.x ? mouseX : item.start.x;
    const endY = mouseY >= item.start.y ? mouseY : item.start.y;
    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    context.save();
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.fillStyle = item.fill;

    if (typeof context.ellipse === 'function') {
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      drawEllipsePolifyll(centerX, centerY, radiusX, radiusY);
    }
    context.stroke();
    if (item.fill) context.fill();
    context.closePath();
    context.restore();
  };

  const onMouseMove = (x, y) => {
    if (!ellipse) return;
    context.putImageData(imageData, 0, 0);
    drawEllipse(ellipse, x, y);
  };

  const onMouseUp = (x, y) => {
    if (!ellipse) return;
    onMouseMove(x, y);
    const item = ellipse;
    imageData = null;
    ellipse = null;
    item.end = { x, y };
    return [item];
  };

  const draw = (item) => drawEllipse(item, item.end.x, item.end.y);

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draw
  };
};
