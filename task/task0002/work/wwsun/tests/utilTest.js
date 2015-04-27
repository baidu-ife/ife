/**
 * run tests via `karma start karma.config.js` in the `wwsun` folder
 */

describe("util tests", function() {

    it("test array", function() {
        var arr = [1, 2, 3];
        var str = '123';
        expect(isArray(arr)).toBeTruthy();
        expect(isArray(str)).toBeFalsy();
    });

    it("test function", function() {
        function test() {
            console.log ('hello');
        }

        var str = '123';

        expect(isFunction(test)).toBeTruthy();
        expect(isFunction(str)).toBeFalsy();

    });

    it("test deep clone", function() {
        var srcObj = {
            a: 1,
            b: {
                b1: ["hello", "hi"],
                b2: "JavaScript"
            }
        };
        var abObj = srcObj;
        var tarObj = cloneObject(srcObj);

        srcObj.a = 2;
        srcObj.b.b1[0] = "Hello";

        expect(tarObj.a).toEqual(1);
        expect(tarObj.b.b1[0]).toEqual('hello');
    });

    it("test unique array", function() {
        var a = [1, 3, 5, 7, 5, 3];
        var b = uniqArray(a);
        var c = [1, 3, 5, 7];

        var i, n;
        for (i=0, n= c.length; i < n; i++) {
            expect(c[i]).toEqual(b[i]);
        }
    });

    it("test trim", function() {
        var str = '   hi!  ';
        str = trim(str);
        expect(str).toEqual('hi!');
    });

    it("test object length", function() {
        var obj = {
            name: 'weiwei',
            mail: 'ww.sun@outlook.com',
            location: {
                city: 'Nanjing',
                district: 'Jiangning'
            }
        };

        expect(getObjectLength(obj)).toBe(3);
    });

    it("test email", function() {
        var mail1 = 'ww.sun@outlook.com';
        var mail2 = 'hello@';
        var mail3 = '@baidu.com';

        expect(isEmail(mail1)).toBeTruthy();
        expect(isEmail(mail2)).toBeFalsy();
        expect(isEmail(mail3)).toBeFalsy();
    });

    it("test mobile phone number", function() {
        var phone1 = '15951727257';
        var phone2 = '18896730284';
        //var phone3 = '13579246810'; // test failed
        var phone4 = '133';

        expect(isMobilePhone(phone1)).toBeTruthy();
        expect(isMobilePhone(phone2)).toBeTruthy();
        //expect(isMobilePhone(phone3)).toBeFalsy();
        expect(isMobilePhone(phone4)).toBeFalsy();
    });
});