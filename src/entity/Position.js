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
var HR_1 = require("./HR");
var Position = /** @class */ (function () {
    function Position() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Position.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ length: 50 }),
        __metadata("design:type", String)
    ], Position.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Position.prototype, "description", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return HR_1.HR; }, function (hr) { return hr.positions; }),
        __metadata("design:type", HR_1.HR)
    ], Position.prototype, "hr", void 0);
    Position = __decorate([
        typeorm_1.Entity()
    ], Position);
    return Position;
}());
exports.Position = Position;
//# sourceMappingURL=Position.js.map