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
var Answer_1 = require("./Answer");
var QuestionAnswers = /** @class */ (function () {
    function QuestionAnswers() {
    }
    __decorate([
        typeorm_1.OneToMany(function (type) { return Answer_1.Answer; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Array)
    ], QuestionAnswers.prototype, "answers", void 0);
    QuestionAnswers = __decorate([
        typeorm_1.Entity()
    ], QuestionAnswers);
    return QuestionAnswers;
}());
exports.QuestionAnswers = QuestionAnswers;
//# sourceMappingURL=QuestionAnswers.js.map