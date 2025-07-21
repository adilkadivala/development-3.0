"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const client = new prisma_1.PrismaClient();
function getuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findFirst({
            where: { id: 1 }, // all columns if not use select bracket
        });
        console.log(user === null || user === void 0 ? void 0 : user.username);
        console.log(user === null || user === void 0 ? void 0 : user.email);
    });
}
function getuserSpecifcFileds() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findFirst({
            where: { id: 1 }, // all columns if not use select bracket
            select: { username: true, email: true }, // select random columns from table
        });
        console.log(user === null || user === void 0 ? void 0 : user.username);
        console.log(user === null || user === void 0 ? void 0 : user.email);
    });
}
function getuserwithrelatedData() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield client.user.findFirst({
            where: { id: 1 }, // all columns if not use select bracket
            include: {
                Todo: true,
            },
        });
        console.log(user);
    });
}
function CreateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.create({
            data: {
                username: "adil",
                password: "adil@1234",
                email: "adil@0gmail.com",
            },
        });
    });
}
function DeleteUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.delete({
            where: { id: 1 },
        });
    });
}
function UpdateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.user.update({
            where: { id: 1 },
            data: {
                username: "john",
            },
        });
    });
}
getuserwithrelatedData();
