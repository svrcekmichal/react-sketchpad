import { v4 } from 'uuid';

export default (context) => {
  let ellipse = null;
  let imageData = null;

  const onMouseDown = (x, y, color, size, fill) => {
    ellipse = {
      id: v4(),
      tool: 'ELLIPSE',
      color,
      size,
      fill,
      start: { x, y },
      end: null
    };
    imageData = context.getImageData(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);
    return [ellipse];
  };

  const drawEllipse = (mouseX, mouseY) => {
    const startX = mouseX < ellipse.start.x ? mouseX : ellipse.start.x;
    const startY = mouseY < ellipse.start.y ? mouseY : ellipse.start.y;
    const endX = mouseX >= ellipse.start.x ? mouseX : ellipse.start.x;
    const endY = mouseY >= ellipse.start.y ? mouseY : ellipse.start.y;

    const radiusX = (endX - startX) * 0.5;
    const radiusY = (endY - startY) * 0.5;
    const centerX = startX + radiusX;
    const centerY = startY + radiusY;

    context.beginPath();
    context.lineWidth = ellipse.size;
    context.strokeStyle = ellipse.color;
    context.fillStyle = ellipse.fill;
    context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    context.stroke();
    if (ellipse.fill) context.fill();
  };

  const onMouseMove = (x, y) => {
    if (!ellipse) return;
    context.putImageData(imageData, 0, 0);
    context.save();
    drawEllipse(x, y);
    context.restore();
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

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
