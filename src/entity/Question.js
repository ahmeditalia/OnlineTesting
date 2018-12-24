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
var Exam_1 = require("./Exam");
var Answer_1 = require("./Answer");
var Question = /** @class */ (function () {
    function Question() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Question.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column('text'),
        __metadata("design:type", String)
    ], Question.prototype, "name", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Exam_1.Exam; }, function (exam) { return exam.questions; }),
        __metadata("design:type", Exam_1.Exam)
    ], Question.prototype, "exam", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Answer_1.Answer; }, function (answer) { return answer.question; }),
        __metadata("design:type", Array)
    ], Question.prototype, "answers", void 0);
    Question = __decorate([
        typeorm_1.Entity()
    ], Question);
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=Question.js.map