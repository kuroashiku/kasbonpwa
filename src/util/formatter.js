export const formatThousandSeparator = (number, precision = 0) => {
    let numberStr = "0";
    if (typeof number === "string") {
        numberStr = number.replace(/[^0-9,-]+/g, "")
    } else if (typeof number === "number") {
        numberStr = number.toFixed(precision);
    }
    numberStr = numberStr.replace(/^0+/, "");
    return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatBackToNumber = (numberStr) => {
    const newNumberStr = numberStr.replace(/[^0-9,-]+/g, "");
    return Number(newNumberStr);
}

export const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2).replace(/\.00$/, '') + ' juta';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + ' ribu';
    } else {
        return num?num.toString():num;
    }
};

export const formatRupiah = (angka) => {
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatSentenceCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return ' ' + txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const formatRangeDate = (date, datenew, flag = false) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var dnew = new Date(datenew),
        monthnew = '' + (dnew.getMonth() + 1),
        daynew = '' + dnew.getDate(),
        yearnew = dnew.getFullYear();

    if (monthnew.length < 2)
        monthnew = '0' + monthnew;
    if (daynew.length < 2)
        daynew = '0' + daynew;
    if (flag == false)
        return (date ? ([day, month, year].join('/')) + "-" : "") + (datenew ? ([daynew, monthnew, yearnew].join('/')) : "");
    else
        return (date ? ([year, month, day].join('-')) + "/" : "") + (datenew ? ([yearnew, monthnew, daynew].join('-')) : "");
}

export const formatDate = (date, flag = false) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    var monthstring = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    if (day.length < 2)
        day = '0' + day;
    if (flag == false)
        return (date ? ([day, monthstring[month], year].join(' ')) : "");
    else
        return (date ? ([day, month, year].join('-')) : "");
}

export const monthConverter = (input, format = 'long') => {
    if (input) {
        const monthNames = {
            long: [
                "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
            ],
            short: [
                "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
                "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
            ]
        };

        if (typeof input === 'number') {
            // Konversi angka ke nama bulan
            return monthNames[format][input - 1];
        } else if (typeof input === 'string') {
            // Konversi nama bulan ke angka
            const indexLong = monthNames.long.indexOf(input);
            const indexShort = monthNames.short.indexOf(input);

            if (indexLong !== -1) {
                return indexLong + 1;
            } else if (indexShort !== -1) {
                return indexShort + 1;
            } else {
                throw new Error('Invalid month name');
            }
        } else {
            throw new Error('Invalid input type');
        }
    } else {
        return ""
    }
};

export const SetItemUnit = (unit) => {
    let satuan = "";

    if (unit === "EKR") {
        satuan = "ekor";
    } else if (unit === "POR") {
        satuan = "porsi";
    } else if (unit === "GLS" || unit === "CUP") {
        satuan = "gelas";
    } else if (unit === "BTL") {
        satuan = "botol";
    } else if (unit === "DUS" || unit === "BOX" || unit === "DOS") {
        satuan = "box";
    } else if (unit === "BKS") {
        satuan = "bungkus";
    } else if (unit === "LUS" || unit === "LSN") {
        satuan = "lusin";
    } else if (unit === "PKT") {
        satuan = "paket";
    } else if (unit === "PCK" || unit === "PAK" || unit === "PAX") {
        satuan = "pack";
    } else if (unit === "PAKETKECIL") {
        satuan = "paket kecil";
    } else if (unit === "KOD") {
        satuan = "kodi";
    } else if (unit === "KG") {
        satuan = "kg";
    } else if (unit === "PCS") {
        satuan = "pcs";
    } else if (unit === "BJI") {
        satuan = "biji";
    } else if (unit === "LBR") {
        satuan = "lembar";
    } else if (unit === "UNT") {
        satuan = "unit";
    } else if (unit === "MTR") {
        satuan = "meter";
    } else if (unit === "LTR") {
        satuan = "liter";
    } else if (unit === "ONS") {
        satuan = "ons";
    } else if (unit === "KGS") {
        satuan = "kg";
    } else if (unit === "KW") {
        satuan = "kwintal";
    } else if (unit === "TON") {
        satuan = "ton";
    } else {
        satuan = unit;
    }

    return satuan;
};

export const capitalizeWords = (text) => {
    if (!text) {
        return "";
    }
    return text.toLowerCase().replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}