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
var Candidate_1 = require("./Candidate");
var QuestionDetail_1 = require("./QuestionDetail");
var Position_1 = require("./Position");
var UserExams = /** @class */ (function () {
    function UserExams() {
    }
    UserExams_1 = UserExams;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserExams.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Exam_1.Exam; }),
        __metadata("design:type", Exam_1.Exam)
    ], UserExams.prototype, "exam", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Candidate_1.Candidate; }, function (candidate) { return candidate.userExams; }),
        __metadata("design:type", Candidate_1.Candidate)
    ], UserExams.prototype, "candidate", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return UserExams_1; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", UserExams)
    ], UserExams.prototype, "precedence", void 0);
    __decorate([
        typeorm_1.Column({ default: false }),
        __metadata("design:type", Boolean)
    ], UserExams.prototype, "passed", void 0);
    __decorate([
        typeorm_1.Column({ default: 0, type: 'float' }),
        __metadata("design:type", Number)
    ], UserExams.prototype, "score", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return QuestionDetail_1.QuestionDetail; }, function (questionDetail) { return questionDetail.userExam; }),
        __metadata("design:type", Array)
    ], UserExams.prototype, "questions", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Position_1.Position; }),
        __metadata("design:type", Position_1.Position)
    ], UserExams.prototype, "position", void 0);
    UserExams = UserExams_1 = __decorate([
        typeorm_1.Entity()
    ], UserExams);
    return UserExams;
    var UserExams_1;
}());
exports.UserExams = UserExams;
//# sourceMappingURL=UserExams.js.map