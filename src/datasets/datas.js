export const Data = [
    {
        "id": "2",
        "name": "基础攻击",
        "subclass": [
            "2-1",
            "2-2",
            "2-3",
            "2-4"
        ]
    },
    {
        "id": "3",
        "name": "复杂攻击",
        "subclass": [
            "3-1",
            "3-2"
        ]
    },

    {
        "id": "2-1",
        "name": "扫描探测",
        "subclass": [
            "2-1-1",
            "2-1-2",
            "2-1-3",
            "2-1-4"
        ]
    },
    {
        "id": "2-1-1",
        "name": "节点扫描"
    },
    {
        "id": "2-1-2",
        "name": "端口扫描",
        "instance": [
            "CAPEC-317",
            "CAPEC-318",
            "CAPEC-319",
            "Snort-621"
        ]
    },
    {
        "id": "2-1-3",
        "name": "服务扫描",
        "subclass": [
            "2-1-3-1"
        ],
        "instance": [
            "CVE-2000-0778",
            "CVE-2000-0853",
            "CVE-2000-0951",
            "CVE-2000-1036",
            "CVE-2000-1050",
            "CVE-2001-0076",
            "CVE-2001-0179",
            "CVE-2001-0224",
            "CVE-2001-0241",
            "CVE-2001-0291",
            "CVE-2001-0432",
            "CVE-2001-0731",
            "CVE-2001-1032",
            "CVE-2001-1216",
            "CVE-2001-1217",
            "CVE-2002-0206",
            "CVE-2002-1559",
            "CVE-2003-0486",
            "CVE-2003-0906",
            "CVE-2014-0160",
            "Snort-2056",
            "Snort-1242",
            "Snort-1245",
            "Snort-1221",
            "Snort-977",
            "Snort-966",
            "Snort-1113",
            "Snort-1112",
            "Snort-1142",
            "Snort-1087",
            "Snort-1156",
            "Snort-1109",
            "Snort-873",
            "Snort-1603",
            "Snort-969",
            "Snort-1070",
            "Snort-1750",
            "Snort-988",
            "Snort-100000185",
        ]
    },
    {
        "id": "2-1-3-1",
        "name": "WEB探测",
        "instance": [
            "Snort-2056",
            "Snort-1242",
            "Snort-1245",
            "Snort-1221",
            "Snort-977",
            "Snort-966",
            "Snort-1113",
            "Snort-1112",
            "Snort-1142",
            "Snort-1087",
            "Snort-1156",
            "Snort-1109",
            "Snort-873",
            "Snort-1603",
            "Snort-969",
            "Snort-1070",
            "Snort-1750",
            "Snort-988",
            "Snort-100000185",
            "Snort-1078",
            "Snort-1216",
            "Snort-825",
            "Snort-1141",
            "Snort-1606",
            "Snort-1969",
            "Snort-1564",
            "Snort-859",
            "Snort-886",
            "Snort-866",
            "Snort-1715",
            "Snort-2281",
            "Snort-2372",
            "Snort-1478",
            "Snort-1403",
            "Snort-853",
            "Snort-1637",
            "Snort-2484",
            "Snort-1037",
            "Snort-1482",
            "Snort-2566",
            "Snort-987",
            "Snort-1769",
            "Snort-1671",
     
        ]
    },
    {
        "id": "2-1-4",
        "name": "情报搜集"
    },
    {
        "id": "2-2",
        "name": "攻击突破",
        "subclass": [
            "2-2-1",
            "2-2-2",
            "2-2-3",
            "2-2-4",
            "2-2-5"
        ]
    },
    {
        "id": "2-2-1",
        "name": "网络协议攻击"
    },
    {
        "id": "2-2-2",
        "name": "中间人攻击"
    },
    {
        "id": "2-2-3",
        "name": "网络服务攻击",
        "subclass": [
            "2-2-3-1",
            "2-2-3-2",
            "2-2-3-3"
        ],
        "instance": [
            "CVE-2006-3439",
            "CVE-2006-5338",
            "CVE-2006-5341",
            "CVE-2006-5675",
            "CVE-2008-1817",
            "CVE-2008-4250",
            "CVE-2010-0139",
            "CVE-2010-2729",
            "CVE-2017-0143",
            "CVE-2017-0144",
            "CVE-2017-0145",
            "CVE-2017-0146",
            "CVE-2017-0147",
            "CVE-2017-0148",
            "CVE-2017-1000060",
            "CVE-2017-14743",
            "CVE-2017-6492",
            "CVE-2017-8543",
            "CVE-2018-10351",
            "CVE-2018-8136",
            "Snort-2515",
            "Snort-2656",
            "Snort-2657",
            "Snort-1010",
            "Snort-2570",
            "Snort-100000314",
            "Snort-45219",
            "Snort-2361",
            "Snort-100000840",
            "Snort-1497",
            "Snort-100000150",
            "Snort-42944",
            "Snort-2497",
            "Snort-100000178",
            "Snort-527",
            "Snort-1545",
            "Snort-100000129",
            "Snort-1091"
        ]
    },
    {
        "id": "2-2-3-1",
        "name": "WEB攻击",
        "instance": [
            "Snort-2515",
            "Snort-2656",
            "Snort-2657",
            "Snort-1010",
            "Snort-2570",
            "Snort-100000314",
            "Snort-45219",
            "Snort-2361",
            "Snort-100000840",
            "Snort-1497",
            "Snort-100000150",
        ]
    },
    {
        "id": "2-2-3-2",
        "name": "内网攻击",
        "instance": [
            "Snort-42944"
        ]
    },
    {
        "id": "2-2-3-3",
        "name": "拒绝服务攻击(DOS)",
        "instance": [
            "Snort-2497",
            "Snort-100000178",
            "Snort-527",
            "Snort-1545",
            "Snort-100000129",
            "Snort-1091"
        ]
    },
    {
        "id": "2-2-4",
        "name": "身份认证攻击",
        "instance": [
            "Snort-560",
            "Snort-1675",
            "Snort-716",
            "Snort-2044",
            "Snort-491",
            "Snort-2924",
            "Snort-100000132",
            "Snort-2441"
        ]
    },
    {
        "id": "2-2-5",
        "name": "社会工程学攻击",
        "subclass": [
            "2-2-5-1",
            "2-2-5-2"
        ],
        "instance": [
            "CVE-2003-0113",
            "CVE-2002-0823",
            "CVE-2003-0113",
            "CVE-2006-0476",
            "CVE-2002-0354",
            "CVE-2004-1049",
            "CVE-2004-0566",
            "CVE-2004-0597",
            "CVE-2004-0990",
            "CVE-2004-1244",
            "CVE-2004-0599",
            "CVE-2004-0990",
            "CVE-2004-1244",
            "CVE-2004-0990",
            "CVE-2004-1244",
            "CVE-2004-0258",
            "CVE-2003-0228",
            "CVE-2012-4331",
            "CVE-2012-2399",
            "CVE-2009-3956",
            "Snort-100000187",
            "Snort-100000652",
            "Snort-100000653",
            "Snort-28054",
            "Snort-100000119",
            "Snort-3148",
            "Snort-100000118",
            "Snort-1841",
            "Snort-100000228",
            "Snort-1735",
            "Snort-2925",
            "Snort-3079",
            "Snort-2671",
            "Snort-2673",
            "Snort-3132",
            "Snort-3133",
            "Snort-3134",
            "Snort-2439",
            "Snort-3088",
            "Snort-3192"
        ]
    },
    {
        "id": "2-2-5-1",
        "name": "基于邮件的社会工程学攻击"
    },
    {
        "id": "2-2-5-2",
        "name": "基于网站的社会工程学攻击"
    },
    {
        "id": "2-3",
        "name": "远程控制",
        "subclass": [
            "2-3-1",
            "2-3-2",
            "2-3-3",
            "2-3-4",
            "2-3-5"
        ]
    },
    {
        "id": "2-3-1",
        "name": "登录控制",
        "subclass": [
            "2-3-1-1",
            "2-3-1-2",
            "2-3-1-3"
        ],
        "instance": [
            "Snort-18388",
            "Snort-21440",
            "Snort-24441",
            "Snort-30918",
            "Snort-31174",
            "Snort-32978",
            "Snort-33594",
            "Snort-40060",
            "Snort-43685",
            "Snort-40501",
            "Snort-42020",
            "Snort-44554",
            "Snort-41336",
            "Snort-27868",
            "Snort-31090",
            "Snort-26924",
            "Snort-31122",
            "Snort-33930",
            "Snort-39730",
            "Snort-39576",
            "Snort-30290",
            "Snort-43523",
            "Snort-46048",
            "Snort-33883",
            "Snort-42391",
            "Snort-32610",
            "Snort-38352",
            "Snort-21852",
            "Snort-40204",
            "Snort-42348",
            "Snort-44639",
            "Snort-33600",
            "Snort-40334",
            "Snort-33893",
            "Snort-32295",
            "Snort-32296",
            "Snort-20021",
            "Snort-248",
            "Snort-250",
            "Snort-247",
            "Snort-249",
            "Snort-23798",
            "Snort-1882",
            "Snort-38358",
            "Snort-45266",
            "Snort-45265",
            "Snort-159",
            "Snort-152",
            "Snort-42329",
            "Snort-42330",
            "Snort-42331",
            "Snort-43459",
            "Snort-1336",
            "Snort-1334",
            "Snort-1335",
            "Snort-1364",
            "Snort-1366",
            "Snort-1359",
            "Snort-1337",
            "Snort-1338",
            "Snort-1370"
        ]
    },
    {
        "id": "2-3-1-1",
        "name": "木马（C&C）",
        "instance": [
            "Snort-18388",
            "Snort-21440",
            "Snort-24441",
            "Snort-30918",
            "Snort-31174",
            "Snort-32978",
            "Snort-33594",
            "Snort-40060",
            "Snort-43685",
            "Snort-40501",
            "Snort-42020",
            "Snort-44554",
            "Snort-41336",
            "Snort-27868",
            "Snort-31090",
            "Snort-26924",
            "Snort-31122",
            "Snort-33930",
            "Snort-39730",
            "Snort-39576",
            "Snort-30290",
            "Snort-43523",
            "Snort-46048",
            "Snort-33883",
            "Snort-42391",
            "Snort-32610",
            "Snort-38352",
            "Snort-21852",
            "Snort-40204",
            "Snort-42348",
            "Snort-44639",
            "Snort-33600",
            "Snort-40334",
            "Snort-33893",
            "Snort-32295",
            "Snort-32296",
            "Snort-20021",
            "Snort-248",
            "Snort-250",
            "Snort-247",
            "Snort-249",
            "Snort-23798",
            "Snort-1882",
            "Snort-38358",
            "Snort-45266",
            "Snort-45265"
        ]
    },
    {
        "id": "2-3-1-2",
        "name": "后门",
        "instance": [
            "Snort-159",
            "Snort-152",
            "Snort-42329",
            "Snort-42330",
            "Snort-42331",
            "Snort-43459"
        ]
    },
    {
        "id": "2-3-1-3",
        "name": "WebShell",
        "instance": [
            "Snort-1336",
            "Snort-1334",
            "Snort-1335",
            "Snort-1364",
            "Snort-1366",
            "Snort-1359",
            "Snort-1337",
            "Snort-1338",
            "Snort-1370"
        ]
    },
    {
        "id": "2-3-2",
        "name": "远程提权"
    },
    {
        "id": "2-3-3",
        "name": "本地攻击"
    },
    {
        "id": "2-3-4",
        "name": "本地提权"
    },
    {
        "id": "2-3-5",
        "name": "安装控制"
    },
    {
        "id": "2-4",
        "name": "窃取利用",
        "subclass": [
            "2-4-1",
            "2-4-2",
            "2-4-3",
            "2-4-4"
        ]
    },
    {
        "id": "2-4-1",
        "name": "资源窃取"
    },
    {
        "id": "2-4-2",
        "name": "篡改破坏"
    },
    {
        "id": "2-4-3",
        "name": "功能盗用"
    },
    {
        "id": "2-4-4",
        "name": "攻击跳板"
    },
    {
        "id": "3-1",
        "name": "准备阶段",
        "subclass": [
            "3-1-1",
            "3-1-2",
            "3-1-3",
            "3-1-4"
        ]
    },
    {
        "id": "3-1-1",
        "name": "探测"
    },
    {
        "id": "3-1-2",
        "name": "突破"
    },
    {
        "id": "3-1-3",
        "name": "控制"
    },
    {
        "id": "3-1-4",
        "name": "渗透"
    },
    {
        "id": "3-2",
        "name": "实施阶段",
        "subclass": [
            "3-2-1",
            "3-2-2",
            "3-2-3",
            "3-2-4"
        ]
    },
    {
        "id": "3-2-1",
        "name": "窃取"
    },
    {
        "id": "3-2-2",
        "name": "篡改"
    },
    {
        "id": "3-2-3",
        "name": "破坏"
    },
    {
        "id": "3-2-4",
        "name": "利用"
    },
    {
        "id": "4-1",
        "name": "基础攻击检测",
        "subclass": [
            "4-1-1",
            "4-1-2"
        ]
    },
    {
        "id": "4-1-1",
        "name": "流量",
        "subclass": [
            "Snort"
        ]
    },
    {
        "id": "Snort",
        "name": "Snort规则",
        "subclass": [
            "Snort-621",
            "Snort-2056",
            "Snort-1242",
            "Snort-1245",
            "Snort-1221",
            "Snort-977",
            "Snort-966",
            "Snort-1113",
            "Snort-1112",
            "Snort-1142",
            "Snort-1087",
            "Snort-1156",
            "Snort-1109",
            "Snort-873",
            "Snort-1603",
            "Snort-969",
            "Snort-1070",
            "Snort-1750",
            "Snort-988",
            "Snort-100000185",

            "Snort-2515",
            "Snort-2656",
            "Snort-2657",
            "Snort-1010",
            "Snort-2570",
            "Snort-100000314",
            "Snort-45219",
            "Snort-2361",
            "Snort-100000840",
            "Snort-1497",
            "Snort-100000150",

            
            "Snort-42944",
            "Snort-2497",
            "Snort-100000178",
            "Snort-527",
            "Snort-1545",
            "Snort-100000129",
            "Snort-1091"
        ]
    },
    {
        "id": "Snort-621",
        "name": "SCAN FIN"
    },
    {
        "id": "Snort-2056",
        "name": "WEB-MISC TRACE attempt",
        "reference": [
            "BugTraq-9561"
        ]
    },
    {
        "id": "Snort-1242",
        "name": "WEB-IIS ISAPI .ida access",
        "reference": [
            "CVE-2000-0071",
            "BugTraq-1065"
        ]
    },
    {
        "id": "Snort-1245",
        "name": "WEB-IIS ISAPI .idq access",
        "reference": [
            "CVE-2000-0071",
            "BugTraq-1065"
        ]
    },
    {
        "id": "Snort-1221",
        "name": "WEB-MISC musicat empower access",
        "reference": [
            "CVE-2001-0224",
            "BugTraq-2374"
        ]
    },
    {
        "id": "Snort-977",
        "name": "WEB-IIS .cnf access",
        "reference": [
            "BugTraq-4078"
        ]
    },
    {
        "id": "Snort-966",
        "name": "WEB-FRONTPAGE .... request",
        "reference": [
            "CVE-1999-0386",
            "CVE-2000-0153",
            "BugTraq-989"
        ]
    },
    {
        "id": "Snort-1113",
        "name": "WEB-MISC http directory traversal"
    },
    {
        "id": "Snort-1112",
        "name": "WEB-MISC http directory traversal"
    },
    {
        "id": "Snort-1142",
        "name": "WEB-MISC /.... access"
    },
    {
        "id": "Snort-1087",
        "name": "WEB-MISC whisker tab splice attack"
    },
    {
        "id": "Snort-1156",
        "name": "WEB-MISC apache directory disclosure attempt",
        "reference": [
            "BugTraq-2503"
        ]
    },
    {
        "id": "Snort-1109",
        "name": "WEB-MISC ROXEN directory list attempt",
        "reference": [
            "CVE-2000-0671",
            "BugTraq-1510"
        ]
    },
    {
        "id": "Snort-873",
        "name": "WEB-CGI scriptalias access",
        "reference": [
            "CVE-1999-0236",
            "BugTraq-2300"
        ]
    },
    {
        "id": "Snort-1603",
        "name": "WEB-MISC DELETE attempt"
    },
    {
        "id": "Snort-969",
        "name": "WEB-IIS WebDAV file lock attempt",
        "reference": [
            "BugTraq-2736"
        ]
    },
    {
        "id": "Snort-1070",
        "name": "WEB-MISC WebDAV search access",
        "reference": [
            "CVE-2000-0951",
            "BugTraq-1756"
        ]
    },
    {
        "id": "Snort-1750",
        "name": "WEB-IIS users.xml access"
    },
    {
        "id": "Snort-988",
        "name": "WEB-IIS SAM Attempt"
    },
    {
        "id": "Snort-100000185",
        "name": "Snort-100000185"
    },


    {
        "id": "Snort-1872",
        "name": "WEB-MISC Oracle Dynamic Monitoring Services dms access"
    },
    {
        "id": "Snort-2515",
        "name": "WEB-MISC PCT Client_Hello overflow attempt",
        "reference": [
            "CVE-2003-0719",
            "BugTraq-10116"
        ]
    },
    {
        "id": "Snort-2656",
        "name": "WEB-MISC SSLv2 Client_Hello Challenge Length overflow attempt"
    },
    {
        "id": "Snort-2657",
        "name": "WEB-MISC SSLv2 Client_Hello with pad Challenge Length overflow attempt"
    },
    {
        "id": "Snort-1010",
        "name": "WEB-IIS encoding access",
        "reference": [
            "CVE-2000-0024",
            "BugTraq-886"
        ]
    },
    {
        "id": "Snort-2570",
        "name": "WEB-MISC Invalid HTTP Version String",
        "reference": [
            "BugTraq-9809"
        ]
    },
    {
        "id": "Snort-100000314",
        "name": "COMMUNITY WEB-MISC MediaWiki parser script insertion attempt",
        "reference": [
            "CVE-2006-2611"
        ]
    },
    {
        "id": "Snort-45219",
        "name": "SERVER-WEBAPP Embedthis GoAhead LD_preload code execution attempt",
        "reference": [
            "CVE-2017-17562"
        ]
    },
    {
        "id": "Snort-2361",
        "name": "WEB-PHP news.php file include",
        "reference": [
            "BugTraq-6674"
        ]
    },
    {
        "id": "Snort-100000840",
        "name": "COMMUNITY WEB-PHP FlatNuke index.php remote file include",
        "reference": [
            "BugTraq-18966"
        ]
    },
    {
        "id": "Snort-1497",
        "name": "WEB-MISC cross site scripting attempt"
    },
    {
        "id": "Snort-100000150",
        "name": "COMMUNITY WEB-MISC HTTP Transfer-Content Request Smuggling attempt",
        "reference": [
            "CVE-2005-2088",
            "CVE-2005-2089",
            "CVE-2005-2090",
            "CVE-2005-2091",
            "CVE-2005-2092",
            "CVE-2005-2093",
            "CVE-2005-2094",
            "BugTraq-13873",
            "BugTraq-14106"
        ]
    },

    {
        "id": "Snort-42944",
        "name": "OS-WINDOWS Microsoft Windows SMB remote code execution attempt",
        "reference": [
            "CVE-2017-0144",
            "CVE-2017-0146"
        ]
    },
    {
        "id": "Snort-2497",
        "name": "IMAP SSLv3 invalid data version attempt",
        "reference": [
            "CVE-2004-0120",
            "BugTraq-10115"
        ]
    },
    {
        "id": "Snort-100000178",
        "name": "COMMUNITY WEB-MISC Hasbani-WindWeb GET DoS attempt",
        "reference": [
            "BugTraq-15225"
        ]
    },
    {
        "id": "Snort-527",
        "name": "BAD-TRAFFIC same SRC/DST",
        "reference": [
            "CVE-1999-0016",
            "BugTraq-2666"
        ]
    },
    {
        "id": "Snort-1545",
        "name": "DOS Cisco attempt"
    },
    {
        "id": "Snort-100000129",
        "name": "COMMUNITY WEB-MISC Cisco IOS HTTP Router Management Service Infinite Loop DoS",
        "reference": [
            "BugTraq-10014"
        ]
    },
    {
        "id": "Snort-1091",
        "name": "WEB-MISC ICQ Webfront HTTP DOS",
        "reference": [
            "CVE-2000-1078",
            "BugTraq-1463"
        ]
    },
    {
        "id": "4-1-2",
        "name": "终端"
    },
    {
        "id": "4-2",
        "name": "复杂攻击检测",
        "subclass": [
            "4-2-1",
            "4-2-2"
        ]
    },
    {
        "id": "4-2-1",
        "name": "关联分析",
        "subclass": [
            "ACC"
        ]
    },
    {
        "id": "ACC",
        "name": "攻击链特征",
        "subclass": [
            "ACC-251WL-35LL-34LL-31LL-41LW",
            "ACC-12WL-23WL-31LL-23LW"
        ]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW",
    	"name": "资源窃取仿真",
    	"subclass":[
    		"ACC-251WL-35LL-34LL-31LL-41LW:1",
    		"ACC-251WL-35LL-34LL-31LL-41LW:2",
    		"ACC-251WL-35LL-34LL-31LL-41LW:3",
    		"ACC-251WL-35LL-34LL-31LL-41LW:4",
    		"ACC-251WL-35LL-34LL-31LL-41LW:5"
    		]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW:1",
    	"name": "基于邮件的社会工程学攻击",
    	"reference": [
    		"2-2-5-1"
    		]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW:2",
    	"name": "安装控制",
    	"reference": [
    		"2-2-3-5"
    		]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW:3",
    	"name": "操作系统权限转换",
    	"reference": [
    		"2-2-3-4"
    		]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW:4",
    	"name": "非法登录认证",
    	"reference": [
    		"2-2-3-1"
    		]
    },
    {
    	"id":"ACC-251WL-35LL-34LL-31LL-41LW:5",
    	"name": "资源窃取",
    	"reference": [
    		"2-4-1"
    		]
    },
    {
    	"id":"ACC-12WL-23WL-31LL-23LW",
    	"name": "拒绝服务攻击仿真",
    	"subclass":[
    		"ACC-12WL-23WL-31LL-23LW:1",
    		"ACC-12WL-23WL-31LL-23LW:2",
    		"ACC-12WL-23WL-31LL-23LW:3",
    		"ACC-12WL-23WL-31LL-23LW:4"
    		]
    },    
    {
    	"id":"ACC-12WL-23WL-31LL-23LW:1",
    	"name": "服务信息探测",
    	"reference": [
    		"2-1-2"
    		]
    },
    {
    	"id":"ACC-12WL-23WL-31LL-23LW:2",
    	"name": "网络服务攻击",
    	"reference": [
    		"2-2-3"
    		]
    },
    {
    	"id":"ACC-12WL-23WL-31LL-23LW:3",
    	"name": "非法登录认证",
    	"reference": [
    		"2-2-3-1"
    		]
    },
    {
    	"id":"ACC-12WL-23WL-31LL-23LW:4",
    	"name": "网络服务攻击",
    	"reference": [
    		"2-2-3"
    		]
    },
    {
        "id": "4-2-2",
        "name": "人工分析"
    }
]
