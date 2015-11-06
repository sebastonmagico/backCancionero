// psalms.js
// ========
module.exports = {

    chapters:{
        1: 6,
        2:12,
        3:8,
        4:8,
        5:12,
        6:10,
        7:17,
        8:9,
        9:20,
        10:18,
        11:7,
        12:8,
        13:6,
        14:7,
        15:5,
        16:9,
        17:15,
        18:50,
        19:14,
        20:9,
        21:13,
        22:31,
        23:6,
        24:10,
        25:22,
        26:12,
        27:14,
        28:9,
        29:11,
        30:12,
        31:24,
        32:11,
        33:22,
        34:22,
        35:28,
        36:12,
        37:40,
        38:22,
        39:13,
        40:17,
        41:13,
        42:11,
        43:5,
        44:26,
        45:17,
        46:11,
        47:9,
        48:14,
        49:20,
        50:22,
        51:19,
        52:9,
        53:6,
        54:7,
        55:23,
        56:13,
        57:11,
        58:11,
        59:17,
        60:12,
        61:8,
        62:12,
        63:11,
        64:10,
        65:13,
        66:20,
        67:6,
        68:35,
        69:36,
        70:5,
        71:24,
        72:20,
        73:28,
        74:23,
        75:10,
        76:12,
        77:20,
        78:72,
        79:13,
        80:19,
        81:16,
        82:8,
        83:18,
        84:12,
        85:13,
        86:17,
        87:7,
        88:18,
        89:52,
        90:17,
        91:16,
        92:15,
        93:5,
        94:23,
        95:11,
        96:13,
        97:12,
        98:9,
        99:9,
        100:5,
        101:8,
        102:28,
        103:22,
        104:35,
        105:45,
        106:48,
        107:43,
        108:13,
        109:31,
        110:7,
        111:10,
        112:10,
        113:9,
        114:8,
        115:18,
        116:19,
        117:2,
        118:29,
        119:176,
        120:7,
        121:8,
        122:9,
        123:4,
        124:8,
        125:5,
        126:6,
        127:5,
        128:6,
        129:8,
        130:8,
        131:3,
        132:18,
        133:3,
        134:3,
        135:21,
        136:26,
        137:9,
        138:8,
        139:24,
        140:13,
        141:10,
        142:7,
        143:12,
        144:15,
        145:21,
        146:10,
        147:20,
        148:14,
        149:9,
        150:6

    },

    randomNumber: function(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    },

    randomChapter:function(){
        var chapterNumber = this.randomNumber(1,150);
        var verseNumber = this.randomNumber(1,this.chapters[chapterNumber]);

        return "Ps."+chapterNumber+"."+verseNumber+".js";

    }

};