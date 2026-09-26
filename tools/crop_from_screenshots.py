"""Instagram のスクリーンショットから作品を切り出して images/ に保存する（仮の画像用）。
本番では元の写真データに差し替えてください。"""
import sys, os
from PIL import Image

UP = sys.argv[1] if len(sys.argv) > 1 else "."
SHOTS = ["01faf139-image.png", "5664a352-image.png", "fb6765ab-image.png", "58b6c598-image.png", "9ac6647f-image.png"]
ROWS = [
    [(169, 716), (719, 1252), (1255, 1788), (1791, 2324)],
    [(203, 737), (740, 1273), (1276, 1809), (1818, 2345)],
    [(233, 766), (769, 1302), (1305, 1838), (1841, 2374)],
    [(171, 705), (707, 1240), (1243, 1776), (1778, 2311)],
    [(204, 738), (740, 1273), (1276, 1809), (1811, 2344)],
]
COLS = [(0, 400), (403, 804), (807, 1206)]

# (保存先, スクショ番号, 行, 列, 上のアイコンを避ける, 下の閲覧数を避ける)
PLAN = [
    ("hall/001", 0, 0, 0, True, True),      # 島と雲
    ("hall/002", 3, 3, 0, False, False),    # 海へ続く踏切
    ("hall/003", 2, 0, 2, False, True),     # ポカリスエット
    ("hall/004", 1, 1, 0, False, True),     # くらげ
    ("room01/005", 0, 1, 0, False, True),   # 白い雲
    ("room01/006", 0, 2, 1, False, True),   # 淡い青空
    ("room01/007", 1, 1, 2, False, True),   # かもめ
    ("room01/008", 1, 1, 1, False, True),   # 昼の月
    ("room02/009", 0, 2, 2, False, True),   # 横断歩道の標識
    ("room02/010", 1, 0, 1, False, True),   # 矢印の標識
    ("room02/011", 2, 1, 0, False, True),   # 横断歩道の標識（冬）
    ("room02/012", 2, 1, 1, False, True),   # 30
    ("room02/013", 2, 0, 1, False, True),   # 京都タワー
    ("room02/014", 2, 3, 1, False, True),   # 編隊飛行
    ("room02/015", 2, 3, 2, False, True),   # ヘリコプター
    ("room03/016", 3, 1, 2, False, False),  # 海沿いの電車
    ("room03/017", 0, 2, 0, False, True),   # 浜辺の車
    ("room03/018", 3, 3, 1, False, False),  # 線路の町
    ("room03/019", 1, 2, 2, False, True),   # 海面
    ("room03/020", 3, 3, 2, False, False),  # 富士山と電車
    ("room04/021", 0, 1, 1, False, True),   # かき氷
    ("room04/022", 0, 3, 1, False, True),   # カメラ
    ("room04/023", 1, 0, 0, False, True),   # 白鳥のキーホルダー
    ("exhibition/024", 1, 3, 2, True, True),  # blur
    ("exhibition/025", 1, 3, 1, False, True), # 青い時間のビル
    ("exhibition/026", 2, 2, 1, False, True), # 夜の電話ボックス
    ("exhibition/027", 2, 2, 2, False, True), # 雲間の月
    ("archive/028", 1, 2, 0, False, True),  # くらげ
    ("archive/029", 1, 0, 2, True, True),   # 水に映る階段
    ("archive/030", 1, 2, 1, False, True),  # 階段の影
    ("archive/031", 1, 3, 0, False, True),  # 公衆電話
    ("archive/032", 2, 0, 0, False, True),  # らせん階段
    ("archive/033", 2, 1, 2, False, True),  # 夜の池
    ("archive/034", 2, 2, 0, False, True),  # 夕方の建築
    ("archive/035", 2, 3, 0, False, True),  # 飛行機雲
    ("archive/036", 3, 0, 0, False, False), # 川とタワー
    ("archive/037", 3, 0, 1, False, False), # 夏の花
    ("archive/038", 3, 1, 0, False, False), # 日の入り
    ("archive/039", 3, 1, 1, False, False), # 満月
    ("archive/040", 3, 2, 0, False, False), # ビル群
    ("archive/041", 0, 3, 0, False, True),  # 霧の町
    ("archive/042", 0, 1, 2, False, True),  # 淡い緑の空
    ("archive/043", 4, 0, 0, False, False), # 鳳凰
    ("archive/044", 4, 0, 1, False, False), # 塔のある坂道
    ("archive/045", 4, 1, 1, True, True),   # 狐
    ("archive/046", 4, 1, 2, False, False), # 朱の御堂
    ("archive/047", 4, 2, 0, False, False), # 金色の楼閣
    ("archive/048", 4, 2, 1, False, False), # 舞台
    ("archive/049", 4, 2, 2, True, True),   # 灯台
    ("archive/050", 4, 3, 0, True, True),   # 夕暮れのタワー
    ("archive/051", 4, 3, 2, False, False), # 月食
]

out_root = os.path.join(os.path.dirname(__file__), "..", "images")
for path, s, r, c, top, bottom in PLAN:
    im = Image.open(os.path.join(UP, SHOTS[s])).convert("RGB")
    y1, y2 = ROWS[s][r]; x1, x2 = COLS[c]
    box = (x1 + 2, y1 + (86 if top else 2), x2 - (16 if c == 2 else 2), y2 - (86 if bottom else 2))
    out = os.path.join(out_root, path + ".jpg")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im.crop(box).save(out, quality=90)
print(len(PLAN), "works cropped")
