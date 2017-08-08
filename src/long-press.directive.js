import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/repeat';
var LongPressDirective = (function () {
    function LongPressDirective() {
        this.longPress = 500;
        this.onRelease = new EventEmitter();
        this.mouseups$ = new Subject();
        this.mousedowns$ = new Subject();
        this.destroys$ = new Subject();
    }
    LongPressDirective.prototype.ngOnInit = function () {
        var _this = this;
        var interval$ = this.interval$()
            .takeUntil(this.mouseups$)
            .combineLatest(this.mouseups$);
        this.mousedowns$
            .asObservable()
            .map(function () { return interval$; })
            .switch()
            .repeat()
            .map(function (items) { return items[1]; })
            .takeUntil(this.destroys$)
            .subscribe(function (event) {
            _this.onRelease.emit(event);
        });
    };
    LongPressDirective.prototype.ngOnDestroy = function () {
        this.destroys$.next();
        this.destroys$.unsubscribe();
    };
    LongPressDirective.prototype.interval$ = function () {
        var _this = this;
        return Observable
            .interval()
            .map(function (i) { return i * 10; })
            .filter(function (i) { return i > _this.longPress; });
    };
    LongPressDirective.prototype.onMouseUp = function (event) {
        this.mouseups$.next(event);
    };
    LongPressDirective.prototype.onMouseDown = function (event) {
        this.mousedowns$.next(event);
    };
    return LongPressDirective;
}());
export { LongPressDirective };
LongPressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[longPress]'
            },] },
];
LongPressDirective.ctorParameters = function () { return []; };
LongPressDirective.propDecorators = {
    'longPress': [{ type: Input },],
    'onRelease': [{ type: Output },],
    'onMouseUp': [{ type: HostListener, args: ['mouseup', ['$event'],] },],
    'onMouseDown': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
};
//# sourceMappingURL=long-press.directive.js.map