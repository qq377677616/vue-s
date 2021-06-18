//引入相关依赖
import { withParams, regex } from "vuelidate/lib/validators/common"
/**
 * 手机号码
 */
const phone = regex('phone', /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/)
/**
 * 姓名（2-4个中文字符）
 */
const name = regex('name', /^[\u4e00-\u9fa5]{2,4}$/)
/**
 * 密码（字母开头，长度在6~18之间，只能包含字母、数字和下划线）
 */
const password = regex('name', /^[a-zA-Z]\w{5,17}$/)
/**
 * 座机号码
 */
const telephone = regex('telephone', /^(0\d{2,3})-?(\d{7,8})$/)
/**
 * 身份证号码
 */
const identityCard = regex('identityCard', /(^\d{15}$)|(^\d{18}$)|(^d{17}(\d|X|x)$)/)
/**
 * QQ号
 */
const qq = regex('qq', /^[1-9][0-9]\d{4,9}$/)
/**
 * 邮政编码
 */
const postalCode = regex('postalCode', /^[1-9]\d{5}$/)

/**
 * 自定义带参数的验证规则
 */
const maxMin = function (max, min) {
  return withParams({ type: maxMin }, function (value) {
    return !!value && max > value && min < value;
  })
}

export {
  phone,
  name,
  password,
  telephone,
  identityCard,
  qq,
  postalCode,
  maxMin
}
/**
 * 内置验证规则
 * https://www.vuelidate.cn/
 * 
 *名称	    参数     	描述
  required	none	需要非空数据。检查空数组和仅包含空格的字符串。
  requiredIf	locator *	仅在提供的属性或谓词为true时才需要非空数据。
  requiredUnless	locator *	仅在提供的属性或谓词为false时才需要非空数据。
  minLength	min length	要求输入具有指定的最小长度（含在内）。与数组一起使用。
  maxLength	max length	要求输入具有最大的指定长度（包括该长度）。与数组一起使用。
  minValue	min	要求输入具有指定的最小数值或日期。
  maxValue	max	要求输入具有指定的最大数值或日期。
  between	min, max	检查数字或日期是否在指定范围内。最小值和最大值都包括在内。
  alpha	none	仅接受字母字符。
  alphaNum	none	仅接受字母数字。
  numeric	none	仅接受数字。
  integer	none	接受正负整数。
  decimal	none	接受正负十进制数。
  email	none	接受有效的电子邮件地址。请记住，您仍然必须在服务器上仔细验证它，因为如果不发送验证电子邮件就无法确定该地址是否真实。
  ipAddress	none	接受点分十进制表示法的有效IPv4地址，例如127.0.0.1。
  macAddress	separator=':'	接受有效的MAC地址，例如00：ff：11：22：33：44：55。不要忘记调用它macAddress()因为它具有可选参数。您可以指定自己的分隔符，而不是':'。提供空的分隔符macAddress('')以验证MAC地址，例如00ff1122334455。
  sameAs	locator *	检查给定属性是否相等。
  url	none	仅接受网址。
  or	validators...	当提供的验证器中的至少一个通过时通过。
  and	validators...	当所有提供的验证程序通过时通过。
  not	validator	如果提供的验证程序不通过则通过，否则失败。可以与其他验证器（如）链接在一起not(sameAs('field')).
  withParams	$params, validator	不是真正的验证器，而是验证器修饰符。将$params 对象添加到提供的验证器。可以用于验证功能，甚至可以用于整个嵌套字段验证对象。对于创建自己的自定义验证器很有用。 
 */