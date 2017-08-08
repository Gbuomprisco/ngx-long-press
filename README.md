# ngx-long-press - "Long Press" directive for Angular

This directive allows to add a custom "long press" event that fires after an element has been pressed for a certain amount of time.

## Getting Started

    npm install ngx-long-press --save // OR
    yarn add ngx-long-press

## Import the module

```javascript
import { LongPressModule } from 'ngx-long-press';

// register module
```

```html
<button [longPress] (onRelease)="onLongPress()">
    Press me for 500ms
</button>

<!-- 2000 is in milliseconds -->

<button [longPress]="2000" (onRelease)="onVeryLongPress()">
    Press me for 2 seconds
</button>
```

Through the input `longPress` you can configure for how long an element needs to be pressed in order to trigger the output in millliseconds. By default, `onRelease` emits after 500ms, just like on Android browers.