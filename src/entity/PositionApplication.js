"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Position_1 = require("./Position");
var Candidate_1 = require("./Candidate");
var PositionApplication = /** @class */ (function () {
    function PositionApplication() {
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Position_1.Position; }, {
            primary: true
        }),
        __metadata("design:type", Position_1.Position)
    ], PositionApplication.prototype, "position", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Candidate_1.Candidate; }, function (candidate) { return candidate.positions; }, {
            primary: true
        }),
        __metadata("design:type", Candidate_1.Candidate)
    ], PositionApplication.prototype, "candidate", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], PositionApplication.prototype, "accepted", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], PositionApplication.prototype, "seen", void 0);
    PositionApplication = __decorate([
        typeorm_1.Entity()
    ], PositionApplication);
    return PositionApplication;
}());
exports.PositionApplication = PositionApplication;
//# sourceMappingURL=PositionApplication.js.map