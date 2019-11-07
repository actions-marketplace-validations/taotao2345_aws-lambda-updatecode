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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var lambda_1 = __importDefault(require("aws-sdk/clients/lambda"));
var fs_1 = __importDefault(require("fs"));
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var FunctionName, zipFile, publish, lambdaConfig, lambda, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    FunctionName = core.getInput('function_name', { required: true });
                    zipFile = core.getInput('zip_file', { required: true });
                    publish = core.getInput('publish')
                        ? Boolean(core.getInput('publish'))
                        : false;
                    lambdaConfig = {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                        apiVersion: '2015-03-31',
                        maxRetries: 2,
                        region: process.env.AWS_REGION,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                        sslEnabled: true,
                    };
                    lambda = new lambda_1.default(lambdaConfig);
                    core.info('Function Updating...');
                    return [4 /*yield*/, lambda
                            .updateFunctionCode({
                            FunctionName: FunctionName,
                            ZipFile: fs_1.default.readFileSync(zipFile),
                        })
                            .promise()];
                case 1:
                    response = _a.sent();
                    core.info("Update Success : " + response.FunctionName + " RevisionId = " + response.RevisionId + " CodeSize = " + response.CodeSize);
                    if (!publish) return [3 /*break*/, 3];
                    core.info('Publishing...');
                    return [4 /*yield*/, lambda
                            .publishVersion({
                            FunctionName: FunctionName,
                        })
                            .promise()];
                case 2:
                    _a.sent();
                    core.info('Publish Success');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    core.setFailed(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
run();
