var util = require('../task0002/util');

var Mocha = require('mocha');
var expect = require('chai').expect; // 引入断言库
//console.log(typeof expect);

describe("百度ife task0002代码测试", function(){ // 测试套件

    it('数组去重函数测试', function() {
        expect(util.uniqArray([1, 1, 1, 2, 3, 3])).to.have.length(3);
        expect(util.uniqArray([1, 1, 1, 2, 3, 3])).to.be.a("array");
        expect(util.uniqArray([1, 1, 1, 2, 3, 3])).to.be.eql([1, 2, 3]);
    });

    it('javascript 基本类型判断', function() {
        expect(util.isFunction(function(){})).to.be.a('boolean');
        expect(util.isFunction(function(){})).to.be.ture;
    });

    it('字符串去除空格和tab', function() {
        expect(util.trims('  abc      ')).to.be.eql('abc');
    });

    it('简化去除空格和tab', function() {
        expect(util.trim('   bca    ')).to.be.eql('bca');
    })

    it('每个数组执行制定的函数', function(){
    });

    it('获取第一层次的属性个数', function() {
        expect(util.getObjectLength({
            toString: 1,
            valueOf: 2,
            toLocalString: 3,
            name: {
                hello: 1,
                b: 2,
                c: 3
            }
        })).to.be.equal(4);
    });

    it('Email判断', function() {
        expect(util.isEmail("1234241@qq.com")).to.be.ok;
    });

    it('手机号码判断', function() {
       expect(util.isMobilePhone(18179851630)).to.be.ok;
    });

});
























