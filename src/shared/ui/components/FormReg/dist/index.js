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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
var FormReg_module_scss_1 = require("./FormReg.module.scss");
var network_1 = require("../../../network");
var CustomButton_1 = require("../CustomButton");
var FormReg = function () {
    var navigate = react_router_dom_1.useNavigate();
    // const [success, setSucces] = useState('');
    function handleSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, network_1["default"]({ url: '/users', method: 'POST', data: values })];
                    case 1:
                        _a.sent();
                        console.log(values);
                        // setSucces('Регистраци прошла успешно! Вы будете перенаправлены на страницу входа');
                        navigate('/auth');
                        return [2 /*return*/];
                }
            });
        });
    }
    var validatePassword = function (rule, value, callback) {
        // at least one small letter, at least one capital, at least 8 digits, no special symbols
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!value.match(re)) {
            callback('Пароль должен не менее 8 символов и состоять из цифр и латинских букв обоих регистров');
        }
        else {
            callback();
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Form, { name: "reg-form", initialValues: { remember: true }, onFinish: function (e) { return handleSubmit(e); }, autoComplete: "off", layout: "vertical" },
            react_1["default"].createElement(antd_1.Form.Item, { className: FormReg_module_scss_1["default"].inputWrapper, name: "firstname", rules: [{ required: true, message: 'Введите имя!' }, { max: 25, message: 'Имя не должно быть длиннее 25 символов' }] },
                react_1["default"].createElement(antd_1.Input, { className: FormReg_module_scss_1["default"].input, placeholder: "\u0418\u043C\u044F", name: "firstname" })),
            react_1["default"].createElement(antd_1.Form.Item, { className: FormReg_module_scss_1["default"].inputWrapper, name: "lastname", rules: [{ required: true, message: 'Введите фамилию!' }, { max: 25, message: 'Фамилия не должна быть длиннее 25 символов' }] },
                react_1["default"].createElement(antd_1.Input, { className: FormReg_module_scss_1["default"].input, placeholder: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", name: "lastname" })),
            react_1["default"].createElement(antd_1.Form.Item, { className: FormReg_module_scss_1["default"].inputWrapper, name: "email", rules: [
                    {
                        type: 'email',
                        message: 'Некорректный формат адреса электронной почты!'
                    },
                    {
                        required: true,
                        message: 'Введите E-mail!'
                    },
                ] },
                react_1["default"].createElement(antd_1.Input, { className: FormReg_module_scss_1["default"].input, placeholder: "Email", name: "email" })),
            react_1["default"].createElement(antd_1.Form.Item, { className: FormReg_module_scss_1["default"].inputWrapper, name: "password", rules: [{ required: true, message: 'Введите пароль!' },
                    { validator: validatePassword }] },
                react_1["default"].createElement(antd_1.Input.Password, { className: FormReg_module_scss_1["default"].input, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", name: "password" })),
            react_1["default"].createElement(antd_1.Form.Item, { className: FormReg_module_scss_1["default"].inputWrapper, name: "confirm", dependencies: ['password'], hasFeedback: true, rules: [
                    {
                        required: true,
                        message: 'Повторите пароль'
                    },
                    function (_a) {
                        var getFieldValue = _a.getFieldValue;
                        return ({
                            validator: function (_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            }
                        });
                    },
                ] },
                react_1["default"].createElement(antd_1.Input.Password, { className: FormReg_module_scss_1["default"].input, placeholder: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" })),
            react_1["default"].createElement(antd_1.Form.Item, { name: "remember", valuePropName: "checked" },
                react_1["default"].createElement(antd_1.Checkbox, null,
                    "\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u0443\u0441\u043B\u043E\u0432\u0438\u044F",
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("a", { href: "!#" }, "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F"))),
            react_1["default"].createElement(antd_1.Form.Item, null,
                react_1["default"].createElement(CustomButton_1["default"], { buttonStyle: "btm--primary", type: "submit", onClick: function () { } }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442")))));
};
exports["default"] = FormReg;
