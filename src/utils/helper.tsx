class Helper {
  static moneyFormat(value: number): string {
    let output = "";

    //languagecode-countrycode:
    //languagecode: full list @ https://www.w3schools.com/tags/ref_language_codes.asp
    //countrycode: full list @ https://www.w3schools.com/tags/ref_country_codes.asp
    const locale = "vi-VN";

    //full currencylist at https://www.currency-iso.org/en/home/tables/table-a1.html
    const currency = "VND";

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    });

    //formating data
    output = formatter.format(value);

    return output;
  }

  static numberFormat(value: number): string {
    let output = "";

    const locale = "vi-VN";
    const formatter = new Intl.NumberFormat(locale);

    //formating data
    output = formatter.format(value);

    return output;
  }

  static round(number: number, precision: number) {
    var shift = (number: number, precision: number) => {
      var numArray = ("" + number).split("e");
      return +(
        numArray[0] +
        "e" +
        (numArray[1] ? +numArray[1] + precision : precision)
      );
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  static isNumber(n: string) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
  }

  static fileExtension(filename: string) {
    if (!filename) return "";
    var ext = (/[^./\\]*$/.exec(filename) || [""])[0];
    return ext.toLowerCase();
  }

  static codau2khongdau(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  static checkDateString(date: number) {
    return date.toString().length < 8 ? "0" + date.toString() : date.toString();
  }

  static checkTimeString(time: number) {
    return time.toString().length < 4 ? "0" + time.toString() : time.toString();
  }

  static getHostname(): string {
    //this values will detect as NO-HOSTNAME
    //and trigger show hostname input on login / forgotpass / reset pass
    const markAsEmptyHostnameItems = [
      "localhost",
      "app.cropany.com",
      "betaapp.cropany.com",
    ];
    const hostname = document.location.hostname || "";
    if (hostname === "" || markAsEmptyHostnameItems.includes(hostname)) {
      return "";
    } else {
      return hostname;
    }
  }

  static isJsonParsable(text: string): boolean {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  }
}

export default Helper;
