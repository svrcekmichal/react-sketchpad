# react-sketchpad
Sketch pad created with canvas

## Why I built this?

1. to learn
2. to learn
3. to learn
4. just have fun? :D

## Example:

![Draw little frog](docs/frog.gif?raw=true "Draw little frog")

![Draw react logo with aniamted pencil](docs/react3.gif?raw=true "Draw react logo with aniamted pencil")

There was websocket used in this gifs, which is not part of example. To make it work with syncing just run this little websocket server

```js
import Server from 'socket.io';
const io = new Server().attach(12346);

io.on('connection', (socket) => {
    socket.on('addItem', (data) => {
        console.log(data);
        socket.broadcast.emit('addItem', data);
    });
});
```

## API:       

|Attribute   	          |Type       |Default Value  |Description   	|
|---	                  |---	      |---	          |---	|
| width                 | number    | 500           | width of canvas in pixels |
| height                | number    | 500           | height of the canvas in pixels |
| items                 | array     | -             | array of items to draw in canvas |
| animate               | bool      | true          | few tools, for example pencil, can bew animated when drawed |
| canvasClassName       | string    | .canvas       | css class of canvas |
| color                 | string    | #000          | primary drawing color |
| fillColor             | string    | `""`          | color used for filling items like circle or rectangle, empty string is no filling |
| size                  | number    | 5             | size of the item |
| tool                  | string    | TOOL_PENCIL   | currently used tool from the map |
| toolsMap              | object    | object map    | keys are tool names, values are tool functions, by default Pencil, Line, Circle and Rectangle tools are available |
| onItemStart           | func      | -             | function to be executed on item start, most of the time first argument is item |
| onEveryItemChange     | func      | -             | function to be executed on item change, most of the time first argument is item, other arguments describe changes |
| onDebouncedItemChange | func      | -             | function to be executed in interval on item change, most of the time first argument is item, other arguments describe batched changes |
| onCompleteItem        | func      | -             | function to be executed on item end, most of the time first argument is item |
| debounceTime          | number    | 1000          | how often onDebouncedItemChange will be called |
