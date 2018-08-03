/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { MediaPlayerBaseExtensionDirective } from '../base-extension.directive';
export class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.position = 0;
        this.buffered = [];
        this.mouseDown = false;
        this.scrub = { visible: false, position: 0, time: 0 };
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // watch for changes to the current time
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => {
            this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(current => {
            this.current = current;
            this.position = (this.current / this.mediaPlayerService.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe((buffered) => {
            this.buffered = [];
            for (let /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({
                    start: (buffered.start(idx) / this.mediaPlayerService.duration) * 100,
                    end: (buffered.end(idx) / this.mediaPlayerService.duration) * 100
                });
            }
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        const /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        const /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        mousedown$.pipe(switchMap(() => mousemove$.pipe(takeUntil(mouseup$))), takeUntil(this._onDestroy)).subscribe(() => this.scrub.visible = false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateScrub(event) {
        const /** @type {?} */ target = /** @type {?} */ (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        const /** @type {?} */ timeline = /** @type {?} */ (this.timelineRef.nativeElement);
        const /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }
    /**
     * Skip a number of seconds in any direction
     * @param {?} seconds
     * @return {?}
     */
    skip(seconds) {
        let /** @type {?} */ target = this.current + seconds;
        // ensure that the target position is within the bounds of the clip
        if (target < 0) {
            target = 0;
        }
        if (target > this.mediaPlayerService.duration) {
            target = this.mediaPlayerService.duration;
        }
        this.mediaPlayerService.currentTime = target;
    }
}
MediaPlayerTimelineExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-timeline',
                template: "<p class=\"current-time\">{{ current | duration }}</p>\n\n<div #timeline\n     class=\"timeline-bar\"\n     tabindex=\"0\"\n     role=\"slider\"\n     aria-label=\"Seek slider\"\n     i18n-aria-label\n     aria-valuemin=\"0\"\n     [attr.aria-valuemax]=\"mediaPlayerService.duration | number: '0.0-0'\"\n     [attr.aria-valuenow]=\"mediaPlayerService.currentTime | number: '0.0-0'\"\n     attr.aria-valuetext=\"{{ mediaPlayerService.currentTime | duration }} of {{ mediaPlayerService.duration | duration }}\"\n     (keydown.ArrowLeft)=\"skip(-5)\"\n     (keydown.ArrowRight)=\"skip(5)\"\n     (mouseenter)=\"scrub.visible = true; tooltip.show()\"\n     (mouseleave)=\"scrub.visible = false; tooltip.hide()\"\n     (mousemove)=\"updateScrub($event); tooltip.reposition()\"\n     (mouseup)=\"updateScrub($event)\"\n     (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n    <div class=\"buffered-bar\"\n         *ngFor=\"let buffer of buffered\"\n         [style.left.%]=\"buffer.start\"\n         [style.width.%]=\"buffer.end - buffer.start\">\n    </div>\n\n    <div class=\"media-progress-bar\" [style.width.%]=\"position\">\n        <div #progressThumb\n             class=\"media-progress-bar-thumb\"\n             (mouseenter)=\"scrub.visible = false; tooltip.hide(); $event.stopPropagation()\"\n             (mouseleave)=\"scrub.visible = true; tooltip.show(); $event.stopPropagation()\">\n        </div>\n    </div>\n\n    <div #tooltip=\"ux-tooltip\"\n         class=\"scrub-handle\"\n         [class.scrub-handle-hidden]=\"!scrub.visible\"\n         [style.left.px]=\"scrub.position\"\n         [uxTooltip]=\"popTemplate\"\n         tooltipClass=\"ux-media-player-timeline-tooltip\"\n         placement=\"top\"\n         [showTriggers]=\"[]\"\n         [hideTriggers]=\"[]\"\n         [tooltipDelay]=\"100\"\n         [tooltipDisabled]=\"mediaPlayerService.duration === 0\"></div>\n</div>\n\n<p class=\"duration-time\">{{ mediaPlayerService.duration | duration }}</p>\n\n<ng-template #popTemplate>\n    <span>{{ scrub.time | duration }}</span>\n</ng-template>",
                host: {
                    '(document:mouseup)': 'mouseDown = false',
                    '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
                }
            }] }
];
MediaPlayerTimelineExtensionComponent.propDecorators = {
    thumb: [{ type: ViewChild, args: ['progressThumb',] }],
    timelineRef: [{ type: ViewChild, args: ['timeline',] }]
};
function MediaPlayerTimelineExtensionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.thumb;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.timelineRef;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.current;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.position;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.buffered;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.mouseDown;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype.scrub;
    /** @type {?} */
    MediaPlayerTimelineExtensionComponent.prototype._onDestroy;
}
/**
 * @record
 */
export function MediaPlayerBuffered() { }
function MediaPlayerBuffered_tsickle_Closure_declarations() {
    /** @type {?} */
    MediaPlayerBuffered.prototype.start;
    /** @type {?} */
    MediaPlayerBuffered.prototype.end;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWVkaWEtcGxheWVyL2V4dGVuc2lvbnMvdGltZWxpbmUvdGltZWxpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxVQUFVLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBV2hGLE1BQU0sNENBQTZDLFNBQVEsaUNBQWlDOzs7dUJBS3RFLENBQUM7d0JBQ0EsQ0FBQzt3QkFDYyxFQUFFO3lCQUNmLEtBQUs7cUJBQ2xCLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7MEJBRTNCLElBQUksT0FBTyxFQUFROzs7OztJQUV4QyxRQUFROztRQUdKLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDNUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQzNCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekYsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUMzRSxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBb0IsRUFBRSxFQUFFO1lBQ3RHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBRW5CLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ2YsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRztvQkFDckUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRztpQkFDcEUsQ0FBQyxDQUFDO2FBQ047U0FDSixDQUFDLENBQUM7S0FDTjs7OztJQUVELGVBQWU7UUFDWCx1QkFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BFLHVCQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELHVCQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWhELFVBQVUsQ0FBQyxJQUFJLENBQ1gsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDckQsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDN0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDakQ7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCOzs7OztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUV6Qix1QkFBTSxNQUFNLHFCQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFBLENBQUM7UUFFM0MsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDO1NBQ1Y7UUFFRCx1QkFBTSxRQUFRLHFCQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBK0IsQ0FBQSxDQUFDO1FBQ2xFLHVCQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUVwRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN6RDtLQUNKOzs7Ozs7SUFHRCxJQUFJLENBQUMsT0FBZTtRQUNoQixxQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO1FBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7S0FDaEQ7OztZQS9GSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDBCQUEwQjtnQkFDcEMsMmlFQUF3QztnQkFDeEMsSUFBSSxFQUFFO29CQUNGLG9CQUFvQixFQUFFLG1CQUFtQjtvQkFDekMsZUFBZSxFQUFFLCtEQUErRDtpQkFDbkY7YUFDSjs7O29CQUdJLFNBQVMsU0FBQyxlQUFlOzBCQUN6QixTQUFTLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJCYXNlRXh0ZW5zaW9uRGlyZWN0aXZlIH0gZnJvbSAnLi4vYmFzZS1leHRlbnNpb24uZGlyZWN0aXZlJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1lZGlhLXBsYXllci10aW1lbGluZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoZG9jdW1lbnQ6bW91c2V1cCknOiAnbW91c2VEb3duID0gZmFsc2UnLFxuICAgICAgICAnW2NsYXNzLnF1aWV0XSc6ICdtZWRpYVBsYXllclNlcnZpY2UucXVpZXRNb2RlIHx8IG1lZGlhUGxheWVyU2VydmljZS5mdWxsc2NyZWVuJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFQbGF5ZXJUaW1lbGluZUV4dGVuc2lvbkNvbXBvbmVudCBleHRlbmRzIE1lZGlhUGxheWVyQmFzZUV4dGVuc2lvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ3Byb2dyZXNzVGh1bWInKSB0aHVtYjogRWxlbWVudFJlZjtcbiAgICBAVmlld0NoaWxkKCd0aW1lbGluZScpIHRpbWVsaW5lUmVmOiBFbGVtZW50UmVmO1xuXG4gICAgY3VycmVudDogbnVtYmVyID0gMDtcbiAgICBwb3NpdGlvbjogbnVtYmVyID0gMDtcbiAgICBidWZmZXJlZDogTWVkaWFQbGF5ZXJCdWZmZXJlZFtdID0gW107XG4gICAgbW91c2VEb3duOiBib29sZWFuID0gZmFsc2U7XG4gICAgc2NydWIgPSB7IHZpc2libGU6IGZhbHNlLCBwb3NpdGlvbjogMCwgdGltZTogMCB9O1xuXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHdhdGNoIGZvciBjaGFuZ2VzIHRvIHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZnVsbHNjcmVlbkV2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShmdWxsc2NyZWVuID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2NydWIucG9zaXRpb24gPSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS50aW1lVXBkYXRlRXZlbnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gY3VycmVudDtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb24gPSAodGhpcy5jdXJyZW50IC8gdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb24pICogMTAwO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wcm9ncmVzc0V2ZW50LnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoYnVmZmVyZWQ6IFRpbWVSYW5nZXMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgYnVmZmVyZWQubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiAoYnVmZmVyZWQuc3RhcnQoaWR4KSAvIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uKSAqIDEwMCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAoYnVmZmVyZWQuZW5kKGlkeCkgLyB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbikgKiAxMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBtb3VzZWRvd24kID0gZnJvbUV2ZW50KHRoaXMudGh1bWIubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpO1xuICAgICAgICBjb25zdCBtb3VzZW1vdmUkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gICAgICAgIGNvbnN0IG1vdXNldXAkID0gZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuXG4gICAgICAgIG1vdXNlZG93biQucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBtb3VzZW1vdmUkLnBpcGUodGFrZVVudGlsKG1vdXNldXAkKSkpLFxuICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zY3J1Yi52aXNpYmxlID0gZmFsc2UpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3J1YihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVkaWEtcHJvZ3Jlc3MtYmFyLXRodW1iJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRpbWVsaW5lID0gdGhpcy50aW1lbGluZVJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBjb25zdCBib3VuZHMgPSB0aW1lbGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICB0aGlzLnNjcnViLnBvc2l0aW9uID0gZXZlbnQub2Zmc2V0WDtcbiAgICAgICAgdGhpcy5zY3J1Yi50aW1lID0gKGV2ZW50Lm9mZnNldFggLyBib3VuZHMud2lkdGgpICogdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuZHVyYXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duKSB7XG4gICAgICAgICAgICB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5wYXVzZSgpO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVBsYXllclNlcnZpY2UuY3VycmVudFRpbWUgPSB0aGlzLnNjcnViLnRpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2tpcCBhIG51bWJlciBvZiBzZWNvbmRzIGluIGFueSBkaXJlY3Rpb24gKi9cbiAgICBza2lwKHNlY29uZHM6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcy5jdXJyZW50ICsgc2Vjb25kcztcblxuICAgICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgdGFyZ2V0IHBvc2l0aW9uIGlzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoZSBjbGlwXG4gICAgICAgIGlmICh0YXJnZXQgPCAwKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCA+IHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0aGlzLm1lZGlhUGxheWVyU2VydmljZS5kdXJhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWVkaWFQbGF5ZXJTZXJ2aWNlLmN1cnJlbnRUaW1lID0gdGFyZ2V0O1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVBsYXllckJ1ZmZlcmVkIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xufVxuIl19