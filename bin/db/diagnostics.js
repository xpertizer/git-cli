"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diagnostics = void 0;
const os = require("os");
const fs = require("fs");
const pgMonitor = __importStar(require("pg-monitor"));
pgMonitor.setTheme('matrix');
const $DEV = process.env.NODE_ENV === 'development';
const logFile = './db/errors.log';
pgMonitor.setLog((msg, info) => {
    if (info.event === 'error') {
        let logText = os.EOL + msg;
        if (info.time) {
            logText = os.EOL + logText;
        }
        fs.appendFileSync(logFile, logText);
    }
    if (!$DEV) {
        info.display = false;
    }
});
class Diagnostics {
    static init(options) {
        if ($DEV) {
            pgMonitor.attach(options);
        }
        else {
            pgMonitor.attach(options, ['error']);
        }
    }
}
exports.Diagnostics = Diagnostics;
//# sourceMappingURL=diagnostics.js.map