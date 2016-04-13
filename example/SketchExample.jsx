import React, { Component } from 'react';
import { SketchPad, Pencil, Line, Rectangle, Ellipse } from './../src';

const PENCIL = 'pencil';
const LINE = 'line';
const RECTANGLE = 'rectangle';
const ELLIPSE = 'ellipse';

const toolsMap = {
  [PENCIL]: Pencil,
  [LINE]: Line,
  [RECTANGLE]: Rectangle,
  [ELLIPSE]: Ellipse
};

export default class SketchExample extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      tool:PENCIL,
      size: 2,
      color: '#000000',
      fill: false,
      fillColor: '#444444'
    }
  }

  render() {
    const { tool, size, color, fill, fillColor} = this.state;
    return (
      <div>
        <h1>React SketchPad</h1>
        <div style={{float:'left', marginRight:20}}>
          <SketchPad
            width={500}
            height={500}
            animate={0}
            size={size}
            color={color}
            fillColor={fill ? fillColor : ''}
            items={{}}
            tool={toolsMap[tool]}
            onItemStart={(i) => console.log('onItemStart',i)}
            onDebouncedItemChange={(i, p) => console.log('onDebouncedItemChange',i , p)}
            onCompleteItem={(i) => console.log('onCompleteItem',i)}
          />
        </div>
        <div style={{float:'left'}}>
          <div className="tools" style={{marginBottom:20}}>
            <button
              style={tool == PENCIL ? {fontWeight:'bold'} : undefined}
              className={tool == PENCIL  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:PENCIL})}
            >Pencil</button>
            <button
              style={tool == LINE ? {fontWeight:'bold'} : undefined}
              className={tool == LINE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:LINE})}
            >Line</button>
            <button
              style={tool == ELLIPSE ? {fontWeight:'bold'} : undefined}
              className={tool == ELLIPSE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:ELLIPSE})}
            >Ellipse</button>
            <button
              style={tool == RECTANGLE ? {fontWeight:'bold'} : undefined}
              className={tool == RECTANGLE  ? 'item-active' : 'item'}
              onClick={() => this.setState({tool:RECTANGLE})}
            >Rectangle</button>
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">size: </label>
            <input min="1" max="20" type="range" value={size} onChange={(e) => this.setState({size: parseInt(e.target.value)})} />
          </div>
          <div className="options" style={{marginBottom:20}}>
            <label htmlFor="">color: </label>
            <input type="color" value={color} onChange={(e) => this.setState({color: e.target.value})} />
          </div>
          {(this.state.tool == ELLIPSE || this.state.tool == RECTANGLE) ?
            <div>
              <label htmlFor="">fill in:</label>
              <input type="checkbox" value={fill} style={{margin:'0 8'}}
                     onChange={(e) => this.setState({fill: e.target.checked})} />
              {fill ? <span>
                  <label htmlFor="">with color:</label>
                  <input type="color" value={fillColor} onChange={(e) => this.setState({fillColor: e.target.value})} />
                </span> : ''}
            </div> : ''}
        </div>
      </div>
    );
  }
}
