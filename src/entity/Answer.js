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
var QuestionDetail_1 = require("./QuestionDetail");
var Question_1 = require("./Question");
var Answer = /** @class */ (function () {
    function Answer() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Answer.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Answer.prototype, "answer", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Answer.prototype, "correctness", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return QuestionDetail_1.QuestionDetail; }, function (questionDetail) { return questionDetail.answers; }),
        __metadata("design:type", Array)
    ], Answer.prototype, "questionDetails", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Question_1.Question; }, function (question) { return question.answers; }),
        __metadata("design:type", Question_1.Question)
    ], Answer.prototype, "question", void 0);
    Answer = __decorate([
        typeorm_1.Entity()
    ], Answer);
    return Answer;
}());
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map