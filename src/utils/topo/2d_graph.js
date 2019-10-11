export default [
    {
        "id": "2",
        "name": "Basic Attack",
        "subclass": [
            "2-1",
            "2-2",
            "2-3",
            "2-4"
        ],
        "type": "1"
    },
    {
        "id": "3",
        "name": "Complex Attack",
        "subclass": [
            "3-1",
            "3-2"
        ],
        "type": "2"
    },
    {
        "id": "4",
        "name": "Security Detection",
        "subclass": [
            "4-1",
            "4-2",
            "4-3"
        ],
        "type": "3"
    },
    {
        "id": "5",
        "name": "Security Serial Number",
        "subclass": [
            "5-1",
            "5-2",
            "5-3"
        ],
        "type": "4"
    },
    {
        "id": "2-1",
        "name": "2-1",
        "subclass": [
            "2-1-1",
            "2-1-2",
            "2-1-3",
            "2-1-4"
        ],
        "type": "1"
    },
    {
        "id": "2-1-1",
        "name": "2-1-1",
        "type": "1"
    },
    {
        "id": "2-1-2",
        "name": "端口扫描",
        "subclass": [
            "2-1-2-1"
        ],
        "instance": [
            "snort-621",
            "snort-40000011",
            "snort-553",
            "snort-2417",
            "snort-489"
        ],
        "type": "1"
    },
    {
        "id": "2-1-2-1",
        "name": "2-1-2-1",
        "instance": [
            "snort-621",
            "snort-553",
            "snort-2417",
            "snort-489"
        ],
        "subclass": [
            "2-1-2-1-0001",
            "2-1-2-1-0002",
            "2-1-2-1-0003",
            "2-1-2-1-0004"
        ],
        "type": "1"
    },
    {
        "id": "2-1-2-1-0001",
        "name": "2-1-2-1-0001",
        "instance": [
            "snort-621"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-2-1-0002",
        "name": "2-1-2-1-0002",
        "instance": [
            "snort-553"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-2-1-0003",
        "name": "2-1-2-1-0003",
        "instance": [
            "snort-2417"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-2-1-0004",
        "name": "2-1-2-1-0004",
        "instance": [
            "snort-489"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-3",
        "name": "2-1-3",
        "subclass": [
            "2-1-3-1"
        ],
        "type": "1"
    },
    {
        "id": "2-1-3-1",
        "name": "2-1-3-1",
        "type": "1"
    },
    {
        "id": "2-1-4",
        "name": "2-1-4",
        "subclass": [
            "2-1-4-0"
        ],
        "instance": [
            "snort-30514",
            "snort-30515",
            "snort-30516",
            "snort-30517"
        ],
        "type": "1"
    },
    {
        "id": "2-1-4-0",
        "name": "2-1-4-0",
        "instance": [
            "snort-30514",
            "snort-30515",
            "snort-30516",
            "snort-30517"
        ],
        "subclass": [
            "2-1-4-0-0000",
            "2-1-4-0-0001",
            "2-1-4-0-0002",
            "2-1-4-0-0003"
        ],
        "type": "1"
    },
    {
        "id": "2-1-4-0-0000",
        "name": "2-1-4-0-0000",
        "instance": [
            "snort-30514"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-4-0-0001",
        "name": "2-1-4-0-0001",
        "instance": [
            "snort-30515"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-4-0-0002",
        "name": "2-1-4-0-0002",
        "instance": [
            "snort-30516"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-1-4-0-0003",
        "name": "2-1-4-0-0003",
        "instance": [
            "snort-30517"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2",
        "name": "2-2",
        "subclass": [
            "2-2-1",
            "2-2-2",
            "2-2-3",
            "2-2-4",
            "2-2-5"
        ],
        "type": "1"
    },
    {
        "id": "2-2-1",
        "name": "2-2-1",
        "type": "1"
    },
    {
        "id": "2-2-2",
        "name": "2-2-2",
        "type": "1"
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
            "snort-2515",
            "snort-40000012",
            "snort-2656",
            "snort-2657",
            "snort-1010",
            "snort-2570",
            "snort-100000314",
            "snort-45219",
            "snort-2361",
            "snort-100000840",
            "snort-42944",
            "snort-2497",
            "snort-100000178",
            "snort-527",
            "snort-1545",
            "snort-100000129",
            "snort-974"
        ],
        "type": "1"
    },
    {
        "id": "2-2-3-1",
        "name": "2-2-3-1",
        "instance": [
            "snort-2515",
            "snort-2656",
            "snort-2657",
            "snort-1010",
            "snort-2570",
            "snort-100000314",
            "snort-45219",
            "snort-2361",
            "snort-100000840"
        ],
        "subclass": [
            "2-2-3-1-0001",
            "2-2-3-1-0002",
            "2-2-3-1-0003",
            "2-2-3-1-0004",
            "2-2-3-1-0005",
            "2-2-3-1-0006",
            "2-2-3-1-0007",
            "2-2-3-1-0008"
        ],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0001",
        "name": "2-2-3-1-0001",
        "instance": [
            "snort-2515"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0002",
        "name": "2-2-3-1-0002",
        "instance": [
            "snort-2656",
            "snort-2657"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0003",
        "name": "2-2-3-1-0003",
        "instance": [
            "snort-1010"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0004",
        "name": "2-2-3-1-0004",
        "instance": [
            "snort-2570"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0005",
        "name": "2-2-3-1-0005",
        "instance": [
            "snort-100000314"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0006",
        "name": "2-2-3-1-0006",
        "instance": [
            "snort-45219"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0007",
        "name": "2-2-3-1-0007",
        "instance": [
            "snort-2361"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-1-0008",
        "name": "2-2-3-1-0008",
        "instance": [
            "snort-100000840"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-2",
        "name": "2-2-3-2",
        "instance": [
            "snort-42944"
        ],
        "subclass": [
            "2-2-3-2-0001"
        ],
        "type": "1"
    },
    {
        "id": "2-2-3-2-0001",
        "name": "2-2-3-2-0001",
        "instance": [
            "snort-42944"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3",
        "name": "2-2-3-3",
        "instance": [
            "snort-2497",
            "snort-100000178",
            "snort-527",
            "snort-1545",
            "snort-100000129",
            "snort-974"
        ],
        "subclass": [
            "2-2-3-3-0001",
            "2-2-3-3-0002",
            "2-2-3-3-0003",
            "2-2-3-3-0004",
            "2-2-3-3-0005",
            "2-2-3-3-0020"
        ],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0001",
        "name": "2-2-3-3-0001",
        "instance": [
            "snort-2497"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0002",
        "name": "2-2-3-3-0002",
        "instance": [
            "snort-100000178"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0003",
        "name": "2-2-3-3-0003",
        "instance": [
            "snort-527"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0004",
        "name": "2-2-3-3-0004",
        "instance": [
            "snort-1545"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0005",
        "name": "2-2-3-3-0005",
        "instance": [
            "snort-100000129"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-3-3-0020",
        "name": "2-2-3-3-0020",
        "instance": [
            "snort-974"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-4",
        "name": "2-2-4",
        "subclass": [
            "2-2-4-0"
        ],
        "instance": [
            "snort-560",
            "snort-1675",
            "snort-716",
            "snort-2044"
        ],
        "type": "1"
    },
    {
        "id": "2-2-4-0",
        "name": "2-2-4-0",
        "instance": [
            "snort-560",
            "snort-1675",
            "snort-716",
            "snort-2044"
        ],
        "subclass": [
            "2-2-4-0-0000"
        ],
        "type": "1"
    },
    {
        "id": "2-2-4-0-0000",
        "name": "2-2-4-0-0000",
        "instance": [
            "snort-560",
            "snort-1675",
            "snort-716",
            "snort-2044"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-2-5",
        "name": "社会工程学攻击",
        "subclass": [
            "2-2-5-1",
            "2-2-5-2",
            "2-2-5-0"
        ],
        "instance": [
            "snort-100000187",
            "snort-100000652",
            "snort-30000001",
            "snort-100000653",
            "snort-28054",
            "snort-100000119"
        ],
        "type": "1"
    },
    {
        "id": "2-2-5-1",
        "name": "2-2-5-1",
        "type": "1"
    },
    {
        "id": "2-2-5-2",
        "name": "2-2-5-2",
        "type": "1"
    },
    {
        "id": "2-2-5-0",
        "name": "2-2-5-0",
        "instance": [
            "snort-100000187",
            "snort-100000652",
            "snort-100000653",
            "snort-28054",
            "snort-100000119"
        ],
        "subclass": [
            "2-2-5-0-0000"
        ],
        "type": "1"
    },
    {
        "id": "2-2-5-0-0000",
        "name": "2-2-5-0-0000",
        "instance": [
            "snort-100000187",
            "snort-100000652",
            "snort-100000653",
            "snort-28054",
            "snort-100000119"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3",
        "name": "Remote Control",
        "subclass": [
            "2-3-1",
            "2-3-2",
            "2-3-3",
            "2-3-4",
            "2-3-5"
        ],
        "type": "1"
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
            "snort-18388",
            "snort-30000041",
            "snort-21440",
            "snort-24441",
            "snort-30918",
            "snort-31174",
            "snort-32978",
            "snort-33594",
            "snort-40060",
            "snort-159",
            "snort-152",
            "snort-42329",
            "snort-42330",
            "snort-42331",
            "snort-43459",
            "snort-1336",
            "snort-1334",
            "snort-1335",
            "snort-1364"
        ],
        "type": "1"
    },
    {
        "id": "2-3-1-1",
        "name": "Trojan（C&C）",
        "instance": [
            "snort-18388",
            "snort-21440",
            "snort-24441",
            "snort-30918",
            "snort-31174",
            "snort-32978",
            "snort-33594",
            "snort-40060"
        ],
        "subclass": [
            "2-3-1-1-0001",
            "2-3-1-1-0002",
            "2-3-1-1-0003",
            "2-3-1-1-0004",
            "2-3-1-1-0005",
            "2-3-1-1-0006",
            "2-3-1-1-0007"
        ],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0001",
        "name": "2-3-1-1-0001",
        "instance": [
            "snort-18388"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0002",
        "name": "2-3-1-1-0002",
        "instance": [
            "snort-21440"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0003",
        "name": "2-3-1-1-0003",
        "instance": [
            "snort-24441"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0004",
        "name": "2-3-1-1-0004",
        "instance": [
            "snort-30918",
            "snort-31174"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0005",
        "name": "2-3-1-1-0005",
        "instance": [
            "snort-32978"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0006",
        "name": "2-3-1-1-0006",
        "instance": [
            "snort-33594"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-1-0007",
        "name": "2-3-1-1-0007",
        "instance": [
            "snort-40060"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-2",
        "name": "2-3-1-2",
        "instance": [
            "snort-159",
            "snort-152",
            "snort-42329",
            "snort-42330",
            "snort-42331",
            "snort-43459"
        ],
        "subclass": [
            "2-3-1-2-0001",
            "2-3-1-2-0002",
            "2-3-1-2-0003"
        ],
        "type": "1"
    },
    {
        "id": "2-3-1-2-0001",
        "name": "2-3-1-2-0001",
        "instance": [
            "snort-159"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-2-0002",
        "name": "2-3-1-2-0002",
        "instance": [
            "snort-152"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-2-0003",
        "name": "2-3-1-2-0003",
        "instance": [
            "snort-42329",
            "snort-42330",
            "snort-42331",
            "snort-43459"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-3",
        "name": "WebShell",
        "instance": [
            "snort-1336",
            "snort-1334",
            "snort-1335",
            "snort-1364"
        ],
        "subclass": [
            "2-3-1-3-0001",
            "2-3-1-3-0002",
            "2-3-1-3-0003",
            "2-3-1-3-0004"
        ],
        "type": "1"
    },
    {
        "id": "2-3-1-3-0001",
        "name": "2-3-1-3-0001",
        "instance": [
            "snort-1336"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-3-0002",
        "name": "2-3-1-3-0002",
        "instance": [
            "snort-1334"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-3-0003",
        "name": "2-3-1-3-0003",
        "instance": [
            "snort-1335"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-1-3-0004",
        "name": "2-3-1-3-0004",
        "instance": [
            "snort-1364"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-2",
        "name": "2-3-2",
        "type": "1"
    },
    {
        "id": "2-3-3",
        "name": "2-3-3",
        "type": "1"
    },
    {
        "id": "2-3-4",
        "name": "本地提权",
        "subclass": [
            "2-3-4-1"
        ],
        "instance": [
            "snort-30000031",
            "snort-1333",
            "snort-1344",
            "snort-1360",
            "snort-1365"
        ],
        "type": "1"
    },
    {
        "id": "2-3-4-1",
        "name": "2-3-4-1",
        "instance": [
            "snort-1333",
            "snort-1344",
            "snort-1360",
            "snort-1365"
        ],
        "subclass": [
            "2-3-4-1-0001",
            "2-3-4-1-0002",
            "2-3-4-1-0003",
            "2-3-4-1-0004"
        ],
        "type": "1"
    },
    {
        "id": "2-3-4-1-0001",
        "name": "2-3-4-1-0001",
        "instance": [
            "snort-1333"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-4-1-0002",
        "name": "2-3-4-1-0002",
        "instance": [
            "snort-1344"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-4-1-0003",
        "name": "2-3-4-1-0003",
        "instance": [
            "snort-1360"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-4-1-0004",
        "name": "2-3-4-1-0004",
        "instance": [
            "snort-1365"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5",
        "name": "安装控制",
        "subclass": [
            "2-3-5-1"
        ],
        "instance": [
            "snort-30000011",
            "snort-30000021",
            "snort-1233",
            "snort-528",
            "snort-503",
            "snort-504",
            "snort-2181",
            "snort-2180",
            "snort-542",
            "snort-1463",
            "snort-1440"
        ],
        "type": "1"
    },
    {
        "id": "2-3-5-1",
        "name": "2-3-5-1",
        "instance": [
            "snort-1233",
            "snort-528",
            "snort-503",
            "snort-504",
            "snort-2181",
            "snort-2180",
            "snort-542",
            "snort-1463",
            "snort-1440"
        ],
        "subclass": [
            "2-3-5-1-0001",
            "2-3-5-1-0002",
            "2-3-5-1-0003",
            "2-3-5-1-0004",
            "2-3-5-1-0005",
            "2-3-5-1-0006",
            "2-3-5-1-0007",
            "2-3-5-1-0008",
            "2-3-5-1-0009"
        ],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0001",
        "name": "2-3-5-1-0001",
        "instance": [
            "snort-1233"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0002",
        "name": "2-3-5-1-0002",
        "instance": [
            "snort-528"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0003",
        "name": "2-3-5-1-0003",
        "instance": [
            "snort-503"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0004",
        "name": "2-3-5-1-0004",
        "instance": [
            "snort-504"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0005",
        "name": "2-3-5-1-0005",
        "instance": [
            "snort-2181"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0006",
        "name": "2-3-5-1-0006",
        "instance": [
            "snort-2180"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0007",
        "name": "2-3-5-1-0007",
        "instance": [
            "snort-542"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0008",
        "name": "2-3-5-1-0008",
        "instance": [
            "snort-1463"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-3-5-1-0009",
        "name": "2-3-5-1-0009",
        "instance": [
            "snort-1440"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4",
        "name": "2-4",
        "subclass": [
            "2-4-1",
            "2-4-2",
            "2-4-3",
            "2-4-4"
        ],
        "type": "1"
    },
    {
        "id": "2-4-1",
        "name": "资源窃取",
        "subclass": [
            "2-4-1-1"
        ],
        "instance": [
            "snort-1629",
            "snort-561",
            "snort-563",
            "snort-30000042",
            "snort-564",
            "snort-2586",
            "snort-524",
            "snort-1436"
        ],
        "type": "1"
    },
    {
        "id": "2-4-1-1",
        "name": "2-4-1-1",
        "instance": [
            "snort-1629",
            "snort-561",
            "snort-563",
            "snort-564",
            "snort-2586",
            "snort-524",
            "snort-1436"
        ],
        "subclass": [
            "2-4-1-1-0001",
            "2-4-1-1-0002",
            "2-4-1-1-0003",
            "2-4-1-1-0004",
            "2-4-1-1-0005",
            "2-4-1-1-0006",
            "2-4-1-1-0007"
        ],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0001",
        "name": "2-4-1-1-0001",
        "instance": [
            "snort-1629"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0002",
        "name": "2-4-1-1-0002",
        "instance": [
            "snort-561"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0003",
        "name": "2-4-1-1-0003",
        "instance": [
            "snort-563"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0004",
        "name": "2-4-1-1-0004",
        "instance": [
            "snort-564"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0005",
        "name": "2-4-1-1-0005",
        "instance": [
            "snort-2586"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0006",
        "name": "2-4-1-1-0006",
        "instance": [
            "snort-524"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-1-1-0007",
        "name": "2-4-1-1-0007",
        "instance": [
            "snort-1436"
        ],
        "subclass": [],
        "type": "1"
    },
    {
        "id": "2-4-2",
        "name": "2-4-2",
        "type": "1"
    },
    {
        "id": "2-4-3",
        "name": "2-4-3",
        "type": "1"
    },
    {
        "id": "2-4-4",
        "name": "2-4-4",
        "type": "1"
    },
    {
        "id": "3-1",
        "name": "Preparation Stage",
        "subclass": [
            "3-1-1",
            "3-1-2",
            "3-1-3",
            "3-1-4"
        ],
        "type": "2"
    },
    {
        "id": "3-1-1",
        "name": "Detection",
        "type": "2"
    },
    {
        "id": "3-1-2",
        "name": "3-1-2",
        "type": "2"
    },
    {
        "id": "3-1-3",
        "name": "Control",
        "type": "2"
    },
    {
        "id": "3-1-4",
        "name": "Infiltration",
        "type": "2"
    },
    {
        "id": "3-2",
        "name": "Implementation Stage",
        "subclass": [
            "3-2-1",
            "3-2-2",
            "3-2-3",
            "3-2-4"
        ],
        "type": "2"
    },
    {
        "id": "3-2-1",
        "name": "3-2-1",
        "type": "2"
    },
    {
        "id": "3-2-2",
        "name": "3-2-2",
        "type": "2"
    },
    {
        "id": "3-2-3",
        "name": "3-2-3",
        "type": "2"
    },
    {
        "id": "3-2-4",
        "name": "3-2-4",
        "type": "2"
    },
    {
        "id": "4-1",
        "name": "4-1",
        "subclass": [
            "4-1-1",
            "4-1-2"
        ],
        "type": "3"
    },
    {
        "id": "4-1-1",
        "name": "4-1-1",
        "subclass": [
            "Snort"
        ],
        "type": "3"
    },
    {
        "id": "Snort",
        "name": "Snort Rules",
        "subclass": [
            "snort-621",
            "snort-40000011",
            "snort-40000012",
            "snort-40000041",
            "snort-30000001",
            "snort-30000011",
            "snort-30000021",
            "snort-30000031",
            "snort-30000041",
            "snort-30000042",
            "snort-553",
            "snort-2417",
            "snort-489",
            "snort-30514",
            "snort-30515",
            "snort-30516",
            "snort-30517",
            "snort-2515",
            "snort-2656",
            "snort-2657",
            "snort-1010",
            "snort-2570",
            "snort-100000314",
            "snort-45219",
            "snort-2361",
            "snort-100000840",
            "snort-42944",
            "snort-2497",
            "snort-100000178",
            "snort-527",
            "snort-1545",
            "snort-100000129",
            "snort-974",
            "snort-560",
            "snort-1675",
            "snort-716",
            "snort-2044",
            "snort-100000187",
            "snort-100000652",
            "snort-100000653",
            "snort-28054",
            "snort-100000119",
            "snort-18388",
            "snort-21440",
            "snort-24441",
            "snort-30918",
            "snort-31174",
            "snort-32978",
            "snort-33594",
            "snort-40060",
            "snort-159",
            "snort-152",
            "snort-42329",
            "snort-42330",
            "snort-42331",
            "snort-43459",
            "snort-1336",
            "snort-1334",
            "snort-1335",
            "snort-1364",
            "snort-1333",
            "snort-1344",
            "snort-1360",
            "snort-1365",
            "snort-1233",
            "snort-528",
            "snort-503",
            "snort-504",
            "snort-2181",
            "snort-2180",
            "snort-542",
            "snort-1463",
            "snort-1440",
            "snort-1629",
            "snort-561",
            "snort-563",
            "snort-564",
            "snort-2586",
            "snort-524",
            "snort-1436"
        ],
        "type": "3"
    },
    {
        "id": "snort-621",
        "name": "snort-621",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-553",
        "name": "snort-553",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2417",
        "name": "snort-2417",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-489",
        "name": "snort-489",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30514",
        "name": "snort-30514",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-30515",
        "name": "snort-30515",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-30000001",
        "name": "snort-30000001",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30000011",
        "name": "snort-30000011",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30000021",
        "name": "snort-30000021",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30000031",
        "name": "snort-30000031",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30000041",
        "name": "snort-30000041",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30000042",
        "name": "snort-30000042",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-40000011",
        "name": "snort-40000011",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-40000012",
        "name": "snort-40000012",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-40000041",
        "name": "snort-40000041",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-30516",
        "name": "snort-30516",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-30517",
        "name": "snort-30517",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-2515",
        "name": "snort-2515",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2656",
        "name": "snort-2656",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2657",
        "name": "snort-2657",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1010",
        "name": "snort-1010",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2570",
        "name": "snort-2570",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000314",
        "name": "snort-100000314",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-45219",
        "name": "snort-45219",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2361",
        "name": "snort-2361",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000840",
        "name": "snort-100000840",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-42944",
        "name": "snort-42944",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2497",
        "name": "snort-2497",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000178",
        "name": "snort-100000178",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-527",
        "name": "snort-527",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1545",
        "name": "snort-1545",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000129",
        "name": "snort-100000129",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-974",
        "name": "snort-974",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-560",
        "name": "snort-560",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1675",
        "name": "snort-1675",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-716",
        "name": "snort-716",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2044",
        "name": "snort-2044",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000187",
        "name": "snort-100000187",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-100000652",
        "name": "snort-100000652",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-100000653",
        "name": "snort-100000653",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-28054",
        "name": "snort-28054",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-100000119",
        "name": "snort-100000119",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-18388",
        "name": "snort-18388",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-21440",
        "name": "snort-21440",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-24441",
        "name": "snort-24441",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-30918",
        "name": "snort-30918",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-31174",
        "name": "snort-31174",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-32978",
        "name": "snort-32978",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-33594",
        "name": "snort-33594",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-40060",
        "name": "snort-40060",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-159",
        "name": "snort-159",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-152",
        "name": "snort-152",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-42329",
        "name": "snort-42329",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-42330",
        "name": "snort-42330",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-42331",
        "name": "snort-42331",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-43459",
        "name": "snort-43459",
        "xchg": "xchg",
        "type": "5"
    },
    {
        "id": "snort-1336",
        "name": "snort-1336",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1334",
        "name": "snort-1334",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1335",
        "name": "snort-1335",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1364",
        "name": "snort-1364",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1333",
        "name": "snort-1333",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1344",
        "name": "snort-1344",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1360",
        "name": "snort-1360",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1365",
        "name": "snort-1365",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1233",
        "name": "snort-1233",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-528",
        "name": "snort-528",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-503",
        "name": "snort-503",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-504",
        "name": "snort-504",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2181",
        "name": "snort-2181",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2180",
        "name": "snort-2180",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-542",
        "name": "snort-542",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1463",
        "name": "snort-1463",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1440",
        "name": "snort-1440",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1629",
        "name": "snort-1629",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-561",
        "name": "snort-561",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-563",
        "name": "snort-563",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-564",
        "name": "snort-564",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-2586",
        "name": "snort-2586",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-524",
        "name": "snort-524",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "snort-1436",
        "name": "snort-1436",
        "xchg": "-",
        "type": "5"
    },
    {
        "id": "4-1-2",
        "name": "Terminal",
        "type": "3"
    },
    {
        "id": "4-2",
        "name": "Complex Attack Detection",
        "subclass": [
            "4-2-1",
            "4-2-2"
        ],
        "type": "3"
    },
    {
        "id": "4-2-1",
        "name": "4-2-1",
        "subclass": [
            "ACC",
            "AGC",
            "ASC"
        ],
        "type": "3"
    },
    {
        "id": "ACC",
        "name": "Attack Chain Characteristics",
        "subclass": [
            "ACC-251WL-35LL-34LL-31LL-41LW",
            "ACC-12WL-23WL-31LL-23LW"
        ],
        "type": "3"
    },
    {
        "id": "ACC-251WL-35LL-34LL-14LL-31LL-41LW",
        "name": "资源窃取场景",
        "reference": [
            "2-2-5",
            "2-3-5",
            "2-3-4",
            "2-3-1",
            "2-4-1"
        ],
        "type": "3"
    },
    {
        "id": "ACC-12WL-23WL-31LL-23LW",
        "name": "远程致瘫破坏场景",
        "reference": [
            "2-1-2",
            "2-2-3",
            "2-3-1",
            "2-2-3"
        ],
        "type": "3"
    },
    {
        "id": "AGC",
        "name": "Attack graph characteristics",
        "type": "3"
    },
    {
        "id": "ASC",
        "name": "Attack Statistical Characteristics",
        "type": "3"
    },
    {
        "id": "4-2-2",
        "name": "Manual Analysis",
        "type": "3"
    },
    {
        "id": "4-3",
        "name": "Threat Intelligence",
        "subclass": [
            "4-3-1",
            "4-3-2",
            "4-3-3",
            "4-3-4",
            "4-3-5"
        ],
        "type": "3"
    },
    {
        "id": "4-3-1",
        "name": "Unknown",
        "type": "3"
    },
    {
        "id": "4-3-2",
        "name": "White List",
        "type": "3"
    },
    {
        "id": "4-3-3",
        "name": "C&C",
        "type": "3"
    },
    {
        "id": "4-3-4",
        "name": "DDOS",
        "type": "3"
    },
    {
        "id": "4-3-5",
        "name": "Botnet",
        "type": "3"
    },
    {
        "id": "5-1",
        "name": "Weakness Serial Number",
        "subclass": [
            "5-1-1"
        ],
        "type": "4"
    },
    {
        "id": "5-1-1",
        "name": "Vulnerability Serial Number",
        "subclass": [
            "CVE",
            "BugTraq",
            "CNVD",
            "CNNVD"
        ],
        "type": "4"
    },
    {
        "id": "CVE",
        "name": "Common Vulnerabilities & Exposures",
        "type": "4"
    },
    {
        "id": "BugTraq",
        "name": "BugTraq",
        "type": "4"
    },
    {
        "id": "CNVD",
        "name": "China National Vulnerability Database",
        "type": "4"
    },
    {
        "id": "CNNVD",
        "name": "China National Vulnerability Database of Information Security",
        "type": "4"
    },
    {
        "id": "5-2",
        "name": "Attack Serial Number",
        "subclass": [
            "5-2-1",
            "5-2-2"
        ],
        "type": "4"
    },
    {
        "id": "5-2-1",
        "name": "Vulnerability Attack Serial Number",
        "subclass": [
            "CAPEC",
            "CWE"
        ],
        "type": "4"
    },
    {
        "id": "CAPEC",
        "name": "Common Attack Pattern Enumeration and Classification",
        "type": "4"
    },
    {
        "id": "CWE",
        "name": "Common Weakness Enumeration",
        "type": "4"
    },
    {
        "id": "5-2-2",
        "name": "Web Attack Serial Number",
        "type": "4"
    },
    {
        "id": "5-3",
        "name": "Advanced Persistent Threat",
        "subclass": [
            "5-3-1",
            "5-3-2"
        ],
        "type": "4"
    },
    {
        "id": "5-3-1",
        "name": "APT-ALL",
        "subclass": [
            "APT-28",
            "APT-32",
            "APT-34",
            "APT-37"
        ],
        "type": "4"
    },
    {
        "id": "APT-28",
        "name": "APT-28",
        "type": "4"
    },
    {
        "id": "APT-32",
        "name": "APT-32",
        "type": "4"
    },
    {
        "id": "APT-34",
        "name": "APT-34",
        "type": "4"
    },
    {
        "id": "APT-37",
        "name": "APT-37",
        "type": "4"
    },
    {
        "id": "5-3-2",
        "name": "APT-C",
        "subclass": [
            "APT-C-00",
            "APT-C-09",
            "APT-C-12",
            "APT-C-20",
            "APT-C-27"
        ],
        "type": "4"
    },
    {
        "id": "APT-C-00",
        "name": "APT-C-00",
        "type": "4"
    },
    {
        "id": "APT-C-09",
        "name": "APT-C-09",
        "type": "4"
    },
    {
        "id": "APT-C-12",
        "name": "APT-C-12",
        "type": "4"
    },
    {
        "id": "APT-C-20",
        "name": "APT-C-20",
        "type": "4"
    },
    {
        "id": "APT-C-27",
        "name": "APT-C-27",
        "type": "4"
    }
]