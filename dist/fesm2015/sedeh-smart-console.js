import { Injectable, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SmartConsoleService {
    constructor() {
        this.defaultLog = console.log;
        this.defaultInfo = console.info;
        this.defaultWarn = console.warn;
        this.defaultError = console.error;
        this.defaultTable = console.table;
        this.defaultTrace = console.trace;
        this.defaultAssert = console.assert;
        this.output = new EventEmitter();
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _suppressed(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.suppress) {
            /** @type {?} */
            const x = (args instanceof Array) ?
                args.join(',') :
                (typeof args === 'object') ?
                    JSON.stringify(args) : "" + args;
            this.options.suppress.map((item) => {
                if (x.indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _blocked(...args) {
        /** @type {?} */
        let result = false;
        if (this.options.blockCaller) {
            /** @type {?} */
            const stack = new Error().stack.split('\n');
            this.options.blockCaller.map((item) => {
                if (stack[3].indexOf(item) > -1) {
                    result = true;
                }
            });
        }
        return result;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _upscale(...args) {
        /** @type {?} */
        const stack = new Error().stack.split('\n');
        /** @type {?} */
        const re = /([^(]+)@|at ([^(]+) \(/g;
        /** @type {?} */
        const m = re.exec(stack[3]);
        /** @type {?} */
        const i = stack[3].lastIndexOf('/');
        /** @type {?} */
        const n = i > 0 ? stack[3].substring(i + 1).split(':')[0] : '';
        /** @type {?} */
        const t = (m[1] || m[2]);
        /** @type {?} */
        const caller = (t.indexOf('/') ? t.substring(0, t.indexOf('/')) : t);
        /** @type {?} */
        const _date = new Date();
        /** @type {?} */
        const _time = (_date.getMonth() + 1) + "/" +
            _date.getDay() + "/" +
            _date.getFullYear() + " " +
            _date.getHours() + ":" +
            _date.getMinutes() + ":" +
            _date.getSeconds();
        return [_time + " [" + n + " | " + caller + "] "].concat(...args);
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _info(...args) {
        if ((this.options.infoDisabled === undefined || !this.options.infoDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.upgrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["log", ...newArgs]);
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else {
                if (this.options.redirectOutput) {
                    this.output.emit(["info", ...newArgs]);
                }
                else {
                    this.defaultInfo(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _log(...args) {
        if ((this.options.logDisabled === undefined || !this.options.logDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["info", ...newArgs]);
                }
                else {
                    this.defaultInfo(...newArgs);
                }
            }
            else if (this.options.upgrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["warn", ...newArgs]);
                }
                else {
                    this.defaultWarn(...newArgs);
                }
            }
            else {
                if (this.options.redirectOutput) {
                    this.output.emit(["log", ...newArgs]);
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _warn(...args) {
        if ((this.options.warnDisabled === undefined || !this.options.warnDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["log", ...newArgs]);
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else if (this.options.upgrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["error", ...newArgs]);
                }
                else {
                    this.defaultError(...newArgs);
                }
            }
            else {
                if (this.options.redirectOutput) {
                    this.output.emit(["warn", ...newArgs]);
                }
                else {
                    this.defaultWarn(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _error(...args) {
        if ((this.options.errorDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.downGrade) {
                if (this.options.redirectOutput) {
                    this.output.emit(["log", ...newArgs]);
                }
                else {
                    this.defaultLog(...newArgs);
                }
            }
            else {
                if (this.options.redirectOutput) {
                    this.output.emit(["error", ...newArgs]);
                }
                else {
                    this.defaultError(...newArgs);
                }
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _table(...args) {
        if ((this.options.tableDisabled === undefined || !this.options.errorDisabled) &&
            !this._suppressed(args) &&
            !this._blocked(args)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.redirectOutput) {
                this.output.emit(["table", ...newArgs]);
            }
            else {
                this.defaultTable(...newArgs);
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _trace(...args) {
        if ((this.options.traceDisabled === undefined || !this.options.traceDisabled)) {
            /** @type {?} */
            const newArgs = this.options.upscale ?
                this._upscale(args) : args;
            if (this.options.redirectOutput) {
                this.output.emit(["trace", ...newArgs]);
            }
            else {
                this.defaultTrace(...newArgs);
            }
        }
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    _assert(...args) {
        if ((this.options.assertDisabled === undefined || !this.options.assertDisabled)) {
            if (this.options.redirectOutput) {
                this.output.emit(["assert", ...args]);
            }
            else {
                this.defaultAssert(...args);
            }
        }
    }
    /**
     * @param {?} instructions
     * @return {?}
     */
    makeSmartLogs(instructions) {
        this.options = instructions;
        console.log = this._log.bind(this);
        console.info = this._info.bind(this);
        console.warn = this._warn.bind(this);
        console.error = this._error.bind(this);
        console.table = this._table.bind(this);
        console.trace = this._trace.bind(this);
        console.assert = this._assert.bind(this);
    }
    /**
     * @return {?}
     */
    redirectedOutput() {
        return this.output;
    }
}
SmartConsoleService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SmartConsoleModule {
}
SmartConsoleModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                exports: [],
                imports: [CommonModule],
                providers: [SmartConsoleService],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { SmartConsoleService, SmartConsoleModule };

//# sourceMappingURL=sedeh-smart-console.js.map