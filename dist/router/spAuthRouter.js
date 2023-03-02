"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apAuth_1 = require("../controller/apAuth");
const spAuthRouter = (0, express_1.Router)();
spAuthRouter.route('/login').post(apAuth_1.login);
spAuthRouter.route('/refresh').post(apAuth_1.refresh);
exports.default = spAuthRouter;
//# sourceMappingURL=spAuthRouter.js.map