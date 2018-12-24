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
var Question_1 = require("./Question");
var UserExams_1 = require("./UserExams");
var QuestionDetail = /** @class */ (function () {
    function QuestionDetail() {
    }
    __decorate([
        typeorm_1.ManyToOne(function (type) { return UserExams_1.UserExams; }, function (ux) { return ux.questions; }, {
            primary: true
        }),
        __metadata("design:type", UserExams_1.UserExams)
    ], QuestionDetail.prototype, "userExam", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Question_1.Question; }, {
            primary: true
        }),
        __metadata("design:type", Question_1.Question)
    ], QuestionDetail.prototype, "question", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Answer_1.Answer; }),
        __metadata("design:type", Answer_1.Answer)
    ], QuestionDetail.prototype, "chosenAnswer", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Answer_1.Answer; }, function (answer) { return answer.questionDetails; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], QuestionDetail.prototype, "answers", void 0);
    QuestionDetail = __decorate([
        typeorm_1.Entity()
    ], QuestionDetail);
    return QuestionDetail;
}());
exports.QuestionDetail = QuestionDetail;
//# sourceMappingURL=QuestionDetail.js.map