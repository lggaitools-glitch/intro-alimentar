#!/usr/bin/env python3
"""Generate video slides for IntroAlimentar Video 1"""
from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1080, 1920
OUT = os.path.join(os.path.dirname(__file__), 'assets')
os.makedirs(OUT, exist_ok=True)

# Try to use a nice font, fallback to default
def get_font(size, bold=False):
    paths = [
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/System/Library/Fonts/Helvetica.ttc',
        '/System/Library/Fonts/SFNS.ttf',
    ]
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

font_title = get_font(68, bold=True)
font_sub = get_font(42)
font_small = get_font(32)
font_tag = get_font(28, bold=True)
font_emoji = get_font(120)
font_num = get_font(180, bold=True)

def gradient(draw, w, h, c1, c2):
    for y in range(h):
        r = int(c1[0] + (c2[0]-c1[0]) * y / h)
        g = int(c1[1] + (c2[1]-c1[1]) * y / h)
        b = int(c1[2] + (c2[2]-c1[2]) * y / h)
        draw.line([(0,y),(w,y)], fill=(r,g,b))

def draw_text_wrapped(draw, text, x, y, max_w, font, fill, line_spacing=10):
    words = text.split()
    lines = []
    line = ""
    for w in words:
        test = f"{line} {w}".strip()
        bbox = draw.textbbox((0,0), test, font=font)
        if bbox[2] - bbox[0] > max_w and line:
            lines.append(line)
            line = w
        else:
            line = test
    if line:
        lines.append(line)
    
    total_h = 0
    for l in lines:
        bbox = draw.textbbox((0,0), l, font=font)
        total_h += bbox[3] - bbox[1] + line_spacing
    
    cy = y
    for l in lines:
        bbox = draw.textbbox((0,0), l, font=font)
        tw = bbox[2] - bbox[0]
        draw.text((x + (max_w - tw)//2, cy), l, fill=fill, font=font)
        cy += bbox[3] - bbox[1] + line_spacing
    return cy

def draw_tag(draw, text, x, y, font, bg, fg):
    bbox = draw.textbbox((0,0), text, font=font)
    tw, th = bbox[2]-bbox[0], bbox[3]-bbox[1]
    pad_x, pad_y = 28, 12
    draw.rounded_rectangle([x, y, x+tw+pad_x*2, y+th+pad_y*2], radius=25, fill=bg)
    draw.text((x+pad_x, y+pad_y), text, fill=fg, font=font)

# Slide 1: Hook
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (34,197,94), (21,128,61))
draw_tag(draw, "IntroAlimentar", 80, 60, font_tag, (255,255,255,50), (255,255,255))
draw_text_wrapped(draw, "Cuando puede tu bebe empezar a comer?", 80, 600, W-160, font_title, (255,255,255))
draw_text_wrapped(draw, "Las 4 senales clave que debes conocer", 80, 900, W-160, font_sub, (255,255,255,200))
draw.text((W//2-150, 1700), "introalimentar.com", fill=(255,255,255,150), font=font_small)
img.save(os.path.join(OUT, 'slide1.png'))

# Slide 2: 6 months rule
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (254,249,195), (253,230,138))
draw_tag(draw, "OMS + AEP", 80, 60, font_tag, (0,0,0,20), (146,64,14))
draw_text_wrapped(draw, "Lactancia exclusiva hasta los 6 meses", 80, 550, W-160, font_title, (26,26,26))
draw_text_wrapped(draw, "Pero la edad es solo una guia. Lo importante son las senales de madurez.", 80, 850, W-160, font_sub, (80,80,80))
img.save(os.path.join(OUT, 'slide2.png'))

# Slide 3: Signal 1
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (240,253,244), (187,247,208))
draw_tag(draw, "Senal 1 de 4", 80, 60, font_tag, (34,197,94), (255,255,255))
draw.text((W-250, 100), "1", fill=(34,197,94,40), font=font_num)
draw_text_wrapped(draw, "Sostiene la cabeza erguida", 80, 600, W-160, font_title, (26,26,26))
draw_text_wrapped(draw, "Se mantiene sentado con algo de apoyo. Es fundamental para tragar de forma segura.", 80, 850, W-160, font_sub, (80,80,80))
img.save(os.path.join(OUT, 'slide3.png'))

# Slide 4: Signal 2
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (254,243,199), (253,230,138))
draw_tag(draw, "Senal 2 de 4", 80, 60, font_tag, (245,158,11), (255,255,255))
draw.text((W-250, 100), "2", fill=(245,158,11,40), font=font_num)
draw_text_wrapped(draw, "Muestra interes por la comida", 80, 600, W-160, font_title, (26,26,26))
draw_text_wrapped(draw, "Te mira comer, abre la boca, intenta agarrar lo que hay en tu plato.", 80, 850, W-160, font_sub, (80,80,80))
img.save(os.path.join(OUT, 'slide4.png'))

# Slide 5: Signal 3
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (237,233,254), (196,181,253))
draw_tag(draw, "Senal 3 de 4", 80, 60, font_tag, (124,58,237), (255,255,255))
draw.text((W-250, 100), "3", fill=(124,58,237,40), font=font_num)
draw_text_wrapped(draw, "Ya no empuja la comida con la lengua", 80, 600, W-160, font_title, (26,26,26))
draw_text_wrapped(draw, "El reflejo de extrusion ha desaparecido. Acepta la cuchara sin empujar.", 80, 900, W-160, font_sub, (80,80,80))
img.save(os.path.join(OUT, 'slide5.png'))

# Slide 6: Signal 4
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (252,231,243), (249,168,212))
draw_tag(draw, "Senal 4 de 4", 80, 60, font_tag, (236,72,153), (255,255,255))
draw.text((W-250, 100), "4", fill=(236,72,153,40), font=font_num)
draw_text_wrapped(draw, "Se lleva cosas a la boca", 80, 600, W-160, font_title, (26,26,26))
draw_text_wrapped(draw, "Coordina la mano con la boca. Clave para BLW y para la autonomia.", 80, 850, W-160, font_sub, (80,80,80))
img.save(os.path.join(OUT, 'slide6.png'))

# Slide 7: CTA
img = Image.new('RGB', (W, H))
draw = ImageDraw.Draw(img)
gradient(draw, W, H, (34,197,94), (21,128,61))
draw_tag(draw, "IntroAlimentar", 80, 60, font_tag, (255,255,255,50), (255,255,255))
draw_text_wrapped(draw, "Tu bebe cumple las 4 senales? Esta listo!", 80, 550, W-160, font_title, (255,255,255))
draw_text_wrapped(draw, "Plan semanal gratuito paso a paso en", 80, 900, W-160, font_sub, (255,255,255,200))
draw_text_wrapped(draw, "introalimentar.com", 80, 1050, W-160, font_title, (255,255,255))
draw.text((W//2-120, 1700), "Enlace en la bio", fill=(255,255,255,150), font=font_small)
img.save(os.path.join(OUT, 'slide7.png'))

print("All 7 slides generated!")
for i in range(1,8):
    p = os.path.join(OUT, f'slide{i}.png')
    print(f"  slide{i}.png: {os.path.getsize(p)//1024}KB")
