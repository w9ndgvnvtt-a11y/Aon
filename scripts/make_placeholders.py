"""Generate placeholder 'photographs' (SVG) for the museum.
Replace them with real photos later; see README."""
import random, math, os

GRAIN = ('<filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>'
         '<feColorMatrix type="saturate" values="0"/></filter>'
         '<filter id="b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{blur}"/></filter>'
         '<filter id="bb" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="{blur2}"/></filter>')

def hsl(h, s, l):
    return f"hsl({h:.0f} {s:.0f}% {l:.0f}%)"

def wrap(w, h, body, r, blur=6, blur2=40):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<defs>{GRAIN.format(blur=blur, blur2=blur2)}</defs>{body}'
            f'<rect width="{w}" height="{h}" filter="url(#g)" opacity="{r.uniform(.07,.13):.2f}" style="mix-blend-mode:overlay"/></svg>')

def grad(id_, c1, c2, x2="0", y2="1"):
    return f'<linearGradient id="{id_}" x1="0" y1="0" x2="{x2}" y2="{y2}"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient>'

def light(w, h, r, hue, sat):
    l = r.uniform(30, 55)
    body = f'<defs>{grad("bg", hsl(hue, sat, l+8), hsl(hue, sat, l-10), "1", "1")}</defs><rect width="{w}" height="{h}" fill="url(#bg)"/>'
    for _ in range(r.randint(1, 3)):
        x = r.uniform(.05, .7) * w; y = r.uniform(.05, .4) * h
        ww = r.uniform(.12, .3) * w; hh = r.uniform(.3, .6) * h; sk = r.uniform(-.25, .25) * w
        pts = f"{x},{y} {x+ww},{y} {x+ww+sk},{y+hh} {x+sk},{y+hh}"
        body += f'<polygon points="{pts}" fill="{hsl(hue+10, sat+10, 88)}" opacity="{r.uniform(.45,.8):.2f}" filter="url(#b)"/>'
        body += f'<line x1="{x+ww/2}" y1="{y}" x2="{x+ww/2+sk}" y2="{y+hh}" stroke="{hsl(hue, sat, l)}" stroke-width="{w*.012:.0f}" opacity=".7" filter="url(#b)"/>'
        body += f'<line x1="{x+sk/2}" y1="{y+hh/2}" x2="{x+ww+sk/2}" y2="{y+hh/2}" stroke="{hsl(hue, sat, l)}" stroke-width="{w*.012:.0f}" opacity=".7" filter="url(#b)"/>'
    return wrap(w, h, body, r, blur=w*.006)

def people(w, h, r, hue, sat):
    l = r.uniform(55, 80)
    body = f'<defs>{grad("bg", hsl(hue, sat, l), hsl(hue, sat, l-18), "1", "0")}</defs><rect width="{w}" height="{h}" fill="url(#bg)"/>'
    cx = r.uniform(.3, .7) * w; s = r.uniform(.16, .26) * min(w, h) * 1.4
    top = h - s * 2.4
    dark = hsl(hue, max(sat-5, 0), r.uniform(10, 25))
    body += f'<g filter="url(#b)" fill="{dark}"><ellipse cx="{cx}" cy="{top+s*.45}" rx="{s*.36}" ry="{s*.45}"/>'
    body += f'<path d="M{cx-s*.95},{h} C{cx-s*.95},{top+s*1.3} {cx-s*.6},{top+s*1.05} {cx},{top+s*1.02} C{cx+s*.6},{top+s*1.05} {cx+s*.95},{top+s*1.3} {cx+s*.95},{h} Z"/></g>'
    body += f'<rect width="{w}" height="{h}" fill="{hsl(hue, sat, 95)}" opacity="{r.uniform(.05,.25):.2f}"/>'
    return wrap(w, h, body, r, blur=w*.004)

def landscape(w, h, r, hue, sat):
    top = r.uniform(62, 82)
    body = f'<defs>{grad("sky", hsl(hue, sat, top), hsl(hue+15, sat, top-12))}</defs><rect width="{w}" height="{h}" fill="url(#sky)"/>'
    if r.random() < .4:
        hy = r.uniform(.45, .65) * h
        body += f'<circle cx="{r.uniform(.2,.8)*w}" cy="{hy - h*.12}" r="{h*.06}" fill="{hsl(hue+20, sat, 94)}" opacity=".7" filter="url(#bb)"/>'
        body += f'<defs>{grad("sea", hsl(hue, sat, top-20), hsl(hue, sat, top-40))}</defs><rect y="{hy}" width="{w}" height="{h-hy}" fill="url(#sea)"/>'
        body += f'<rect y="{hy}" width="{w}" height="{h*.004}" fill="{hsl(hue, sat, top+10)}" opacity=".6"/>'
    else:
        layers = r.randint(3, 5)
        for i in range(layers):
            base = h * (.45 + i * .12)
            y = base; pts = [f"0,{h}", f"0,{y}"]
            for x in range(0, w + 40, 40):
                y += r.uniform(-1, 1) * h * .03
                y = min(max(y, base - h * .15), base + h * .1)
                pts.append(f"{x},{y:.0f}")
            pts.append(f"{w},{h}")
            flt = 'filter="url(#b)"' if i == 0 else ""
            joined = " ".join(pts)
            body += f'<polygon points="{joined}" fill="{hsl(hue, sat, top - 14 - i*11)}" {flt}/>'
    return wrap(w, h, body, r, blur=w*.003, blur2=h*.03)

def objects(w, h, r, hue, sat):
    l = r.uniform(70, 88)
    body = f'<defs>{grad("bg", hsl(hue, sat, l), hsl(hue, sat, l-8))}</defs><rect width="{w}" height="{h}" fill="url(#bg)"/>'
    ty = r.uniform(.6, .72) * h
    body += f'<rect y="{ty}" width="{w}" height="{h-ty}" fill="{hsl(hue, sat, l-14)}"/>'
    x = r.uniform(.25, .4) * w
    for _ in range(r.randint(1, 3)):
        ow = r.uniform(.08, .16) * w; oh = r.uniform(.12, .35) * h
        col = hsl(hue + r.uniform(-20, 20), sat + 5, r.uniform(20, 60))
        body += f'<ellipse cx="{x+ow*.9}" cy="{ty+oh*.06}" rx="{ow*.9}" ry="{oh*.08}" fill="#000" opacity=".25" filter="url(#bb)"/>'
        if r.random() < .5:
            body += f'<path d="M{x},{ty} L{x},{ty-oh} Q{x+ow/2},{ty-oh-ow*.2} {x+ow},{ty-oh} L{x+ow},{ty} Z" fill="{col}"/>'
        else:
            body += f'<path d="M{x+ow*.3},{ty-oh} L{x+ow*.7},{ty-oh} Q{x+ow*1.3},{ty-oh*.4} {x+ow*.8},{ty} L{x+ow*.2},{ty} Q{x-ow*.3},{ty-oh*.4} {x+ow*.3},{ty-oh} Z" fill="{col}"/>'
        x += ow * r.uniform(1.3, 2)
    return wrap(w, h, body, r, blur=w*.002, blur2=w*.02)

def night(w, h, r, hue, sat):
    body = f'<defs>{grad("bg", hsl(hue, sat, 8), hsl(hue, sat, 16))}</defs><rect width="{w}" height="{h}" fill="url(#bg)"/>'
    x = 0
    while x < w:
        bw = r.uniform(.08, .2) * w; bh = r.uniform(.3, .75) * h
        body += f'<rect x="{x}" y="{h*.8-bh}" width="{bw}" height="{bh}" fill="{hsl(hue, sat, r.uniform(4,10))}"/>'
        for _ in range(r.randint(2, 8)):
            body += f'<rect x="{x + r.uniform(.1,.8)*bw}" y="{h*.8-bh + r.uniform(.05,.9)*bh}" width="{w*.012}" height="{h*.018}" fill="{hsl(40, 60, r.uniform(55,80))}" opacity="{r.uniform(.4,.9):.2f}"/>'
        x += bw + r.uniform(0, .03) * w
    for _ in range(r.randint(1, 3)):
        lx = r.uniform(.1, .9) * w
        body += f'<circle cx="{lx}" cy="{h*.45}" r="{h*.12}" fill="{hsl(38, 70, 70)}" opacity=".35" filter="url(#bb)"/>'
        body += f'<rect x="{lx - w*.004}" y="{h*.8}" width="{w*.008}" height="{h*.2}" fill="{hsl(38, 70, 60)}" opacity=".25" filter="url(#b)"/>'
    body += f'<rect y="{h*.8}" width="{w}" height="{h*.2}" fill="{hsl(hue, sat, 12)}" opacity=".6"/>'
    return wrap(w, h, body, r, blur=w*.004, blur2=h*.05)

KINDS = dict(light=light, people=people, landscape=landscape, objects=objects, night=night)

# (path, kind, w, h, hue, saturation)
SPEC = [
    ("hall/001", "light", 1600, 2000, 35, 8),
    ("hall/002", "landscape", 2400, 1600, 210, 6),
    ("hall/003", "people", 1500, 2000, 30, 4),
    ("hall/004", "objects", 1500, 2000, 40, 10),
    ("room01/005", "light", 2400, 1600, 30, 10),
    ("room01/006", "light", 1600, 2000, 220, 5),
    ("room01/007", "light", 1600, 2400, 0, 0),
    ("room01/008", "light", 2400, 1600, 40, 14),
    ("room02/009", "people", 1200, 1500, 25, 10),
    ("room02/010", "people", 1500, 1200, 200, 6),
    ("room02/011", "people", 1200, 1500, 0, 0),
    ("room02/012", "people", 1200, 1200, 30, 12),
    ("room02/013", "people", 1200, 1600, 210, 5),
    ("room02/014", "people", 1500, 1200, 20, 8),
    ("room02/015", "people", 1200, 1500, 0, 0),
    ("room03/016", "landscape", 3000, 1200, 205, 10),
    ("room03/017", "landscape", 3000, 1200, 30, 8),
    ("room03/018", "landscape", 3000, 1100, 190, 6),
    ("room03/019", "landscape", 3000, 1200, 0, 0),
    ("room03/020", "landscape", 3000, 1100, 215, 12),
    ("room04/021", "objects", 1500, 1900, 35, 12),
    ("room04/022", "objects", 1600, 1600, 0, 0),
    ("room04/023", "objects", 1500, 1900, 25, 16),
    ("exhibition/024", "night", 1600, 2000, 220, 20),
    ("exhibition/025", "night", 1600, 2000, 230, 15),
    ("exhibition/026", "night", 2400, 1600, 215, 18),
    ("exhibition/027", "night", 2400, 1600, 225, 12),
    ("archive/028", "landscape", 2400, 1600, 30, 6),
    ("archive/029", "people", 1600, 2000, 0, 0),
    ("archive/030", "objects", 2000, 1600, 30, 8),
    ("archive/031", "light", 1600, 2000, 40, 10),
    ("archive/032", "night", 2400, 1600, 220, 10),
    ("archive/033", "landscape", 2400, 1600, 200, 8),
    ("archive/034", "people", 1600, 2000, 25, 8),
    ("archive/035", "objects", 1600, 2000, 0, 0),
]

root = os.path.join(os.path.dirname(__file__), "..", "images")
for i, (path, kind, w, h, hue, sat) in enumerate(SPEC):
    r = random.Random(i * 7919 + 13)
    out = os.path.join(root, path + ".svg")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w") as f:
        f.write(KINDS[kind](w, h, r, hue, sat))
print(len(SPEC), "placeholders written")
