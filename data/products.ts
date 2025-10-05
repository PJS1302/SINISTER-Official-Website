/* collections.ts
   Auto-generated dataset for Sinister Shop
   7 collections × 20 products = 140 items
*/

import type { Product } from "../contexts/cart-context"

export interface Collection {
  id: string
  name: string
  description: string
  image: string
  products: Product[]
}

/* ------------------------------
   Helper note: product.id patterns:
   sa-### (accessories), scap-### (caps), sct-### (collectibles),
   sh-### (hoodies), sm-### (masks), st-### (tshirts), sw-### (watches)
   ------------------------------ */

export const collections: Collection[] = [
  /* ---------------- ACCESSORIES ---------------- */
  {
    id: "sinister-accessories",
    name: "SINISTER ACCESSORIES",
    description: "Complete your dark transformation with our cursed collection",
    image: "/ACCESSORIES/193_Image1_1280x.webp",
    products: [
      { id: "sa-001", name: "SINISTER Skull Belt", price: 399, image: "/ACCESSORIES/193_Image1_1280x.webp", category: "SINISTER ACCESSORIES", description: "Best belt wit skull." },
      { id: "sa-002", name: "SINISTER Bottle", price: 299, image: "/ACCESSORIES/33990023_hi.webp", category: "SINISTER ACCESSORIES", description: "Well designed bottle." },
      { id: "sa-003", name: "SINISTER Bloody Backpack", price: 199, image: "/ACCESSORIES/34322640_av1.webp", category: "SINISTER ACCESSORIES", description: "Store your thrilling things here." },
      { id: "sa-004", name: "SINISTER Juice Bottle", price: 299, image: "/ACCESSORIES/34328722_hi.webp", category: "SINISTER ACCESSORIES", description: "Have a sip with sinister." },
      { id: "sa-005", name: "SINISTER Bag with Mini bag", price: 399, image: "/ACCESSORIES/34375111_hi.webp", category: "SINISTER ACCESSORIES", description: "Have more space to store bloody things." },
      { id: "sa-006", name: "SINISTER Mini Toy", price: 299, image: "/ACCESSORIES/34497348_hi.webp", category: "SINISTER ACCESSORIES", description: "Play with Sinister" },
      { id: "sa-007", name: "SINISTER Toy", price: 310, image: "/ACCESSORIES/34525741_av1.webp", category: "SINISTER ACCESSORIES", description: "Tiny skull charming Sinister." },
      { id: "sa-008", name: "SINISTER Pendant", price: 210, image: "/ACCESSORIES/34529670_hi.webp", category: "SINISTER ACCESSORIES", description: "Opem your pendant to see me." },
      { id: "sa-009", name: "SINISTER Halloween Hat", price: 150, image: "/ACCESSORIES/34598413_av1.webp", category: "SINISTER ACCESSORIES", description: "Dark hat for halloween." },
      { id: "sa-010", name: "SINISTER Pen collection set", price: 199, image: "/ACCESSORIES/il_600x600.3261521806_rk9f.webp", category: "SINISTER ACCESSORIES", description: "Write your horror tales." },
      { id: "sa-011", name: "SINISTER Best Keychains", price: 299, image: "/ACCESSORIES/il_600x600.6411029901_18f0.webp", category: "SINISTER ACCESSORIES", description: "Keychains in horror mode." },
      { id: "sa-012", name: "SINISTER Gaming console", price: 250, image: "/ACCESSORIES/il_600x600.6865110019_epo5.webp", category: "SINISTER ACCESSORIES", description: "Play with horror vibe." },
      { id: "sa-013", name: "SINISTER Light Toy", price: 299, image: "/ACCESSORIES/il_600x600.6966463782_5bbq.webp", category: "SINISTER ACCESSORIES", description: "Sinister toy with subtle shine." },
      { id: "sa-014", name: "SINISTER Apple Case", price: 199, image: "/ACCESSORIES/il_600x600.7137871377_oftn.webp", category: "SINISTER ACCESSORIES", description: "Stylish horror apple phone case." },
      { id: "sa-015", name: "SINISTER Lighters", price: 299, image: "/ACCESSORIES/il_600x600.7159721336_88ll.webp", category: "SINISTER ACCESSORIES", description: "Play with fire." },
      { id: "sa-016", name: "SINISTER Handbag", price: 199, image: "/ACCESSORIES/il_600x600.7164141710_mfz5.webp", category: "SINISTER ACCESSORIES", description: "Carry me with you everywhere." },
      { id: "sa-017", name: "SINISTER Skull Handbag", price: 299, image: "/ACCESSORIES/il_600x600.7165649410_j66y.webp", category: "SINISTER ACCESSORIES", description: "Skull styled bag." },
      { id: "sa-018", name: "SINISTER Knife keychains", price: 199, image: "/ACCESSORIES/il_600x600.7209912142_ctza.webp", category: "SINISTER ACCESSORIES", description: "Knife-style keychains." },
      { id: "sa-019", name: "SINISTER Deodorant", price: 299, image: "/ACCESSORIES/WhatsApp Image 2025-08-31 at 16.59.19_a0bfae9e.jpg", category: "SINISTER ACCESSORIES", description: "Smell the best perfume." },
      { id: "sa-020", name: "SINISTER Apple skull case", price: 200, image: "/ACCESSORIES/WhatsApp Image 2025-08-31 at 17.23.08_92eeaf68.jpg", category: "SINISTER ACCESSORIES", description: "Apple phone skull case." },
    ],
  },

  /* ---------------- CAPS ---------------- */
  {
    id: "sinister-caps",
    name: "SINISTER CAPS",
    description: "Crown your darkness with our sinister headwear collection",
    image: "/CAPS/09e9ebde-c957-459c-9fd4-eea160e2bf6e.avif",
    products: [
      { id: "scap-001", name: "SINISTER Shadow Fang Cap", price: 199, image: "/CAPS/09e9ebde-c957-459c-9fd4-eea160e2bf6e.avif", category: "SINISTER CAPS", description: "Low-profile cap with fang embroidery." },
      { id: "scap-002", name: "SINISTER Big Cap", price: 149, image: "/CAPS/il_1588xN.6642625590_skza.webp", category: "SINISTER CAPS", description: "Big cap." },
      { id: "scap-003", name: "SINISTER Red Woolen Cap", price: 299, image: "/CAPS/il_1588xN.7282334969_gdwz.webp", category: "SINISTER CAPS", description: "Red woolen cap." },
      { id: "scap-004", name: "SINISTER Demon Wing Cap", price: 149, image: "/CAPS/ssrco,baseball_cap,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8 (1).jpg", category: "SINISTER CAPS", description: "Wings and flame embroidery for the bold." },
      { id: "scap-005", name: "SINISTER Black Cap", price: 299, image: "/CAPS/ssrco,baseball_cap,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8 (2).jpg", category: "SINISTER CAPS", description: "Sinister black design across the brim." },
      { id: "scap-006", name: "SINISTER Halloween Cap", price: 299, image: "/CAPS/ssrco,baseball_cap,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8.jpg", category: "SINISTER CAPS", description: "Halloween Cap." },
      { id: "scap-007", name: "SINISTER White devil Cap", price: 179, image: "/CAPS/ssrco,baseball_cap,product,FFFFFF_97ab1c12de,front,square,600x600-bg,f8f8f8 (1).jpg", category: "SINISTER CAPS", description: "White devil cap." },
      { id: "scap-008", name: "SINISTER White Sinister Cap", price: 149, image: "/CAPS/ssrco,baseball_cap,product,FFFFFF_97ab1c12de,front,square,600x600-bg,f8f8f8 (2)", category: "SINISTER CAPS", description: "Sinister white cap." },
      { id: "scap-009", name: "SINISTER Skull Cap", price: 279, image: "/CAPS/ssrco,baseball_cap,product,FFFFFF_97ab1c12de,front,square,600x600-bg,f8f8f8.jpg", category: "SINISTER CAPS", description: "Ethereal ghost embroidery." },
      { id: "scap-010", name: "SINISTER Devil Cap", price: 199, image: "/CAPS/ssrco,baseball_cap,product,FFFFFF_97ab1c12de,front,square,600x600-bg,f8f8f8.u3.jpg", category: "SINISTER CAPS", description: "Cauldron icon and devil on the side." },
      { id: "scap-011", name: "SINISTER Demon Cap", price: 179, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8 (1).jpg", category: "SINISTER CAPS", description: "Demon across the crown." },
      { id: "scap-012", name: "SINISTER Stylish Cap", price: 199, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8 (2).jpg", category: "SINISTER CAPS", description: "Stylish cap on your head." },
      { id: "scap-013", name: "SINISTER Dragon Scale Cap", price: 249, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8 (3).jpg", category: "SINISTER CAPS", description: "Scaled texture with Dragon." },
      { id: "scap-014", name: "SINISTER Dragon fire Cap", price: 299, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8.jpg", category: "SINISTER CAPS", description: "Dragon fire cap." },
      { id: "scap-015", name: "SINISTER Sigil Cap", price: 329, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8.u1.jpg", category: "SINISTER CAPS", description: "Occult sigil embroidery: bold and clean." },
      { id: "scap-016", name: "SINISTER Triangle Cap", price: 149, image: "/CAPS/ssrco,dad_hat,product,101010_01c5ca27c6,front,square,600x600-bg,f8f8f8.u3.jpg", category: "SINISTER CAPS", description: "Triangle symbols." },
      { id: "scap-017", name: "SINISTER Emoji Cap", price: 299, image: "/CAPS/ssrco,dad_hat,product,FFFDF5_8c3db69414,front,square,600x600-bg,f8f8f8 (1).jpg", category: "SINISTER CAPS", description: "Emoji with devil cap." },
      { id: "scap-018", name: "SINISTER Nightmare Cap", price: 220, image: "/CAPS/ssrco,dad_hat,product,FFFDF5_8c3db69414,front,square,600x600-bg,f8f8f8 (2).jpg", category: "SINISTER CAPS", description: "Abstract nightmare print with sheen." },
      { id: "scap-019", name: "SINISTER Shadowcap", price: 299, image: "/CAPS/ssrco,dad_hat,product,FFFDF5_8c3db69414,front,square,600x600-bg,f8f8f8 (4).jpg", category: "SINISTER CAPS", description: "Minimalist black cap with hidden logo." },
      { id: "scap-020", name: "SINISTER Cursed Sigil Cap", price: 199, image: "/CAPS/ssrco,dad_hat,product,FFFDF5_8c3db69414,front,square,600x600-bg,f8f8f8.jpg", category: "SINISTER CAPS", description: "Horned sigil cap." },
    ],
  },

  /* ---------------- COLLECTIBLES ---------------- */
  {
    id: "sinister-collectibles",
    name: "SINISTER COLLECTIBLES",
    description: "Rare and cursed artifacts for the true horror enthusiast",
    image: "/COLLECTIBLES/Screenshot 2025-09-28 162240.png",
    products: [
      { id: "sct-001", name: "SINISTER Demon Eye", price: 399, image: "/COLLECTIBLES/il_510x680.618105301_qw9q.webp", category: "SINISTER COLLECTIBLES", description: "Hand-finished demon eye for altars and displays." },
      { id: "sct-002", name: "SINISTER Pumpkin Earrings", price: 199, image: "/COLLECTIBLES/il_510x680.3330643834_josw.webp", category: "SINISTER COLLECTIBLES", description: "Halloween themed earrings." },
      { id: "sct-003", name: "SINISTER Demon Dollar", price: 199, image: "/COLLECTIBLES/il_510x680.4905799174_ggof.webp", category: "SINISTER COLLECTIBLES", description: "Demon Shaped dollar." },
      { id: "sct-004", name: "SINISTER Coffin Pendant", price: 499, image: "/COLLECTIBLES/il_510x680.5065520744_kzp3.webp", category: "SINISTER COLLECTIBLES", description: "Open the coffin as pendant." },
      { id: "sct-005", name: "SINISTER Little knife keychain", price: 499, image: "/COLLECTIBLES/il_510x680.5364414231_1aae.webp", category: "SINISTER COLLECTIBLES", description: "Keychains with little knives." },
      { id: "sct-006", name: "SINISTER Head Slicer Keychain", price: 299, image: "/COLLECTIBLES/il_510x680.5561681461_qdij.webp", category: "SINISTER COLLECTIBLES", description: "Haunting bloody head slicer." },
      { id: "sct-007", name: "SINISTER Coffin Ring", price: 399, image: "/COLLECTIBLES/il_510x680.6277186483_pmio.avif", category: "SINISTER COLLECTIBLES", description: "Coffin ring from the SINISTER universe." },
      { id: "sct-008", name: "SINISTER Butcher Knife Keychain", price: 499, image: "/COLLECTIBLES/il_510x680.6705153026_sc76.webp", category: "SINISTER COLLECTIBLES", description: "Butcher Knife Keywords, perfect for collectors." },
      { id: "sct-009", name: "SINISTER Bracelet", price: 299, image: "/COLLECTIBLES/il_510x680.6902381403_dfle.webp", category: "SINISTER COLLECTIBLES", description: "Skull bracelet with beautifully dark art." },
      { id: "sct-010", name: "SINISTER Bag Collections", price: 499, image: "/COLLECTIBLES/il_510x680.6904996346_r447.webp", category: "SINISTER COLLECTIBLES", description: "Sinister black/red bag set ." },
      { id: "sct-011", name: "SINISTER Bloody eye chain", price: 300, image: "/COLLECTIBLES/il_510x680.7002919272_badf.webp", category: "SINISTER COLLECTIBLES", description: "Bloody eyed dollar with silver thorn necklace." },
      { id: "sct-012", name: "SINISTER Dollar with Chain", price: 299, image: "/COLLECTIBLES/il_510x680.7093476120_dyvv.webp", category: "SINISTER COLLECTIBLES", description: "Crystal ball on a bloody visions." },
      { id: "sct-013", name: "SINISTER Halloween Bag", price: 399, image: "/COLLECTIBLES/il_510x680.7107786132_m3je.webp", category: "SINISTER COLLECTIBLES", description: "Elegant halloween themed bag." },
      { id: "sct-014", name: "SINISTER Skull Bracelet", price: 299, image: "/COLLECTIBLES/il_510x680.7138319172_c0tz.webp", category: "SINISTER COLLECTIBLES", description: "Skull Bracelet for horror feel." },
      { id: "sct-015", name: "SINISTER Violet Ring", price: 599, image: "/COLLECTIBLES/il_510x680.7152789210_sou0.avif", category: "SINISTER COLLECTIBLES", description: "Ancient violet lamp ring." },
      { id: "sct-016", name: "SINISTER Hand Pendant", price: 199, image: "/COLLECTIBLES/il_510x680.7236867057_kl1h.webp", category: "SINISTER COLLECTIBLES", description: "One of the best collectible pendants." },
      { id: "sct-017", name: "SINISTER Bloody Purse", price: 499, image: "/COLLECTIBLES/il_510x680.7247392325_oteb.webp", category: "SINISTER COLLECTIBLES", description: "Carry all your things here.)." },
      { id: "sct-018", name: "SINISTER Demon Eye Chain", price: 399, image: "/COLLECTIBLES/il_1588xN.3737719348_rp9m.webp", category: "SINISTER COLLECTIBLES", description: "Demon eye with chain." },
      { id: "sct-019", name: "SINISTER Coffin Silver pendant", price: 199, image: "/COLLECTIBLES/il_1588xN.6252238978_la4k.webp", category: "SINISTER COLLECTIBLES", description: "Heavy metal silver pendant." },
      { id: "sct-020", name: "SINISTER Red-Eyed Demon Pendant", price: 299, image: "/COLLECTIBLES/Screenshot 2025-09-28 162240.png", category: "SINISTER COLLECTIBLES", description: "Red-Eyed Demon Pendant for Chain." },
    ],
  },

  /* ---------------- HOODIES ---------------- */
  {
    id: "sinister-hoodies",
    name: "SINISTER HOODIES",
    description: "Wrap yourself in darkness and comfort with our cursed collection",
    image: "/HOODIES/il_1588xN.4346317298_iy1d.webp",
    products: [
      { id: "sh-001", name: "SINISTER Classic Night Hoodie", price: 599, image: "/HOODIES/il_600x600.6808960170_tgvo.webp", category: "SINISTER HOODIES", description: "Classic heavyweight hoodie with embroidered logo." },
      { id: "sh-002", name: "SINISTER Blood Red Hoodie", price: 699, image: "/HOODIES/il_600x600.7129461035_hd3m.webp", category: "SINISTER HOODIES", description: "Bold blood-red hoodie with shadow print." },
      { id: "sh-003", name: "SINISTER Ghost Hoodie", price: 399, image: "/HOODIES/il_600x600.7184754430_8mzy.webp", category: "SINISTER HOODIES", description: "White ghost across the chest." },
      { id: "sh-004", name: "SINISTER Ghost Face", price: 350, image: "/HOODIES/il_600x600.7226728278_8ndf.webp", category: "SINISTER HOODIES", description: "Ghost faced Horror hoodie." },
      { id: "sh-005", name: "SINISTER Demon Blaze Hoodie", price: 499, image: "/HOODIES/il_600x600.7227576624_rn2d.webp", category: "SINISTER HOODIES", description: "Demonic print for maximal impact." },
      { id: "sh-006", name: "SINISTER Halloween Hoodie", price: 450, image: "/HOODIES/il_600x600.7242579821_q1yv.webp", category: "SINISTER HOODIES", description: "Halloween -Themed Classic Hoodie." },
      { id: "sh-007", name: "SINISTER-FACE Hoodie", price: 399, image: "/HOODIES/il_600x600.7259458331_a1wy.webp", category: "SINISTER HOODIES", description: "Face of the sinister against you." },
      { id: "sh-008", name: "SINISTER Cartoon Hoodie", price: 320, image: "/HOODIES/il_600x600.7275478743_ql4w.webp", category: "SINISTER HOODIES", description: "Subtle cartoon pattern for a textured look." },
      { id: "sh-009", name: "SINISTER Couple Hoodie", price: 600, image: "/HOODIES/il_680x540.7168526568_pdkg.webp", category: "SINISTER HOODIES", description: "Do your couple goal with pur hoodies." },
      { id: "sh-010", name: "SINISTER Slasher Hoodie", price: 300, image: "/HOODIES/il_680x540.7196522491_417l.webp", category: "SINISTER HOODIES", description: "Ghost Red print, lightweight comfort." },
      { id: "sh-011", name: "SINISTER White Hoodie", price: 500, image: "/HOODIES/il_1588xN.4346317298_iy1d.webp", category: "SINISTER HOODIES", description: "Cauldron and spellbook patchwork." },
      { id: "sh-012", name: "SINISTER Violent Radiant Hoodie", price: 699, image: "/HOODIES/il_1588xN.6217871619_mwnv.webp", category: "SINISTER HOODIES", description: "Night radiance with violet light." },
      { id: "sh-013", name: "SINISTER Reaper's Embrace Hoodie", price: 599, image: "/HOODIES/il_1588xN.7041507766_vofa.webp", category: "SINISTER HOODIES", description: "Reaper silhouette in tonal ink." },
      { id: "sh-014", name: "SINISTER Stylish Hoodie", price: 699, image: "/HOODIES/il_1588xN.7081727394_p57n.webp", category: "SINISTER HOODIES", description: "Scaled textures and flame embroidery." },
      { id: "sh-015", name: "SINISTER Skeleton Hoodie", price: 499, image: "/HOODIES/il_1588xN.7109851244_bw5p.webp", category: "SINISTER HOODIES", description: "Distressed print with skeletal hands." },
      { id: "sh-016", name: "SINISTER Black Hoodie", price: 449, image: "/HOODIES/il_1588xN.7166580893_fzro.webp", category: "SINISTER HOODIES", description: "Bold black print on the back." },
      { id: "sh-017", name: "SINISTER Grey Hoodie", price: 399, image: "/HOODIES/il_1588xN.7248312879_jcmw.webp", category: "SINISTER HOODIES", description: "Stone-guardian grey art embossed on fabric." },
      { id: "sh-018", name: "SINISTER Red Skull Hoodie", price: 499, image: "/HOODIES/il_1588xN.7200332974_kaa4.webp", category: "SINISTER HOODIES", description: "Black hoodie with red skull sketch." },
      { id: "sh-019", name: "SINISTER Nightmare Hoodie", price: 450, image: "/HOODIES/il_1588xN.7256861297_njj7.webp", category: "SINISTER HOODIES", description: "Abstract nightmare composition." },
      { id: "sh-020", name: "SINISTER Green-Radiant Hoodie", price: 799, image: "/HOODIES/il_1588xN.7270714735_nus9.webp", category: "SINISTER HOODIES", description: "Oversized, plush, radiant and forbidding." },
    ],
  },

  /* ---------------- MASKS ---------------- */
  {
    id: "sinister-masks",
    name: "SINISTER MASKS",
    description: "Transform into your darkest nightmares with our terrifying mask collection",
    image: "/MASK/07b34f000c20343be4bfdd99d1eadef1.jpg",
    products: [
      { id: "sm-001", name: "SINISTER Hellspawn Mask", price: 299, image: "/MASK/0d3dddf8781e0ee462fee908ca85a0d7.jpg", category: "SINISTER MASKS", description: "Horns, texture and a permanent snarl." },
      { id: "sm-002", name: "SINISTER Bone Skull Mask", price: 199, image: "/MASK/07b34f000c20343be4bfdd99d1eadef1.jpg", category: "SINISTER MASKS", description: "Realistic bone detail, wearable art." },
      { id: "sm-003", name: "SINISTER Vampire Visage Mask", price: 250, image: "/MASK/8891dfd69eac6b486b17ab8989422afc.jpg", category: "SINISTER MASKS", description: "Pale visage with incisors for scares." },
      { id: "sm-004", name: "SINISTER Lycan Maw Mask", price: 299, image: "/MASK/3fab6eff3e5ead7d828d51f370c48f5c.jpg", category: "SINISTER MASKS", description: "Fur detail and snarling jawline." },
      { id: "sm-005", name: "SINISTER Rotting Ghoul Mask", price: 250, image: "/MASK/9e5bae7fe65be9acd69f0d07b82c761d.jpg", category: "SINISTER MASKS", description: "Grotesque decomposition, vivid effect." },
      { id: "sm-006", name: "SINISTER Phantom Shroud Mask", price: 150, image: "/MASK/508df21d6d694035c16b7b5f0db981de.jpg", category: "SINISTER MASKS", description: "Flowing fabric—spirit-like presence." },
      { id: "sm-007", name: "SINISTER Witch's Face Mask", price: 199, image: "/MASK/82778451d809d7fe6bef0df0c12884bc.jpg", category: "SINISTER MASKS", description: "Old-world witch face, menacing grin." },
      { id: "sm-008", name: "SINISTER Reaper Hood Mask", price: 250, image: "/MASK/508df21d6d694035c16b7b5f0db981de.jpg", category: "SINISTER MASKS", description: "Deathly hood with hollow eyes." },
      { id: "sm-009", name: "SINISTER Gargoyle Visage Mask", price: 199, image: "/MASK/89b20959a9dc81fc8e3c819f141644f5.jpg", category: "SINISTER MASKS", description: "Stone texture and winged silhouette." },
      { id: "sm-010", name: "SINISTER Dragon Fury Mask", price: 199, image: "/MASK/6b853eec10a68b448ae634e6b8896d6f.jpg", category: "SINISTER MASKS", description: "Scaled, scowling dragon face." },
      { id: "sm-011", name: "SINISTER Jester Grin Mask", price: 150, image: "/MASK/2dbf927a69af9e74a59bfb5b3e3d0011.jpg", category: "SINISTER MASKS", description: "Twisted jester smile and bells." },
      { id: "sm-012", name: "SINISTER Plague Doctor Mask", price: 200, image: "/MASK/b13a4b985d942741e8d93f8426d26e77.jpg", category: "SINISTER MASKS", description: "Antique-style beak mask with leather." },
      { id: "sm-013", name: "SINISTER Scarecrow Mask", price: 299, image: "/MASK/974f2b7688c8b53477070ce3bd20f986.jpg", category: "SINISTER MASKS", description: "Weathered burlap with stitched features." },
      { id: "sm-014", name: "SINISTER Phantom Half Mask", price: 149, image: "/MASK/ebbd454e9bbfd8559eff2c2e4e053867.jpg", category: "SINISTER MASKS", description: "Half-face elegance with a sinister twist." },
      { id: "sm-015", name: "SINISTER Mummy Wrap Mask", price: 299, image: "/MASK/3191addb4d05268d27baab18a2f74612.jpg", category: "SINISTER MASKS", description: "Aged bandage wrapping and decay." },
      { id: "sm-016", name: "SINISTER Alien Gaze Mask", price: 199, image: "/MASK/f942715b47ead5be311627bf01a5b583.jpg", category: "SINISTER MASKS", description: "Otherworldly features and large black eyes." },
      { id: "sm-017", name: "SINISTER Jester's Torment Mask", price: 349, image: "/MASK/7199692abab7f05eafb2353cd919ce3f.jpg", category: "SINISTER MASKS", description: "Mad jester expression — highly detailed." },
      { id: "sm-018", name: "SINISTER Executioner Mask", price: 399, image: "/MASK/959178172db6dc701a6be936dd552192.jpg", category: "SINISTER MASKS", description: "Leather hood and iron visage." },
      { id: "sm-019", name: "SINISTER Nightmare Mask", price: 1000, image: "/MASK/23d70387f8c3e590ce2cd608dfc3f96e.jpg", category: "SINISTER MASKS", description: "Abstract terror in textured form." },
      { id: "sm-020", name: "SINISTER Custom Horror Mask", price: 499, image: "/MASK/26072d36e63c0bfb7b2bed6941f65431.jpg", category: "SINISTER MASKS", description: "Customizable mask—made to order." },
    ],
  },

  /* ---------------- T-SHIRTS ---------------- */
  {
    id: "sinister-tshirts",
    name: "SINISTER T-SHIRTS",
    description: "Unleash your dark side with our terrifying t-shirt collection",
    image: "/T-SHIRTS/6fb75c0d06da43c2b2931c26f47a30c5.webp",
    products: [
      { id: "st-001", name: "SINISTER Demonic T-shirt", price: 299, image: "/T-SHIRTS/6fb75c0d06da43c2b2931c26f47a30c5.webp", category: "SINISTER T-SHIRTS", description: "Graphic demonic Satan T-shirt." },
      { id: "st-002", name: "SINISTER Red Skull T-shirt", price: 399, image: "/T-SHIRTS/71VJ3amXCcL._UF1000,1000_QL80_.jpg", category: "SINISTER T-SHIRTS", description: "Skull Red-eye chest print." },
      { id: "st-003", name: "SINISTER Gothic Metal T-shirt", price: 299, image: "/T-SHIRTS/il_340x270.3817924515_2mtk.jpg", category: "SINISTER T-SHIRTS", description: "Metal-style gothic lettering." },
      { id: "st-004", name: "SINISTER Skull Reaper T-shirt", price: 199, image: "/T-SHIRTS/house-by-the-cemetery-tshirt.jpg", category: "SINISTER T-SHIRTS", description: "Reaper and skull composition." },
      { id: "st-005", name: "SINISTER Bloody Demon T-shirt", price: 300, image: "/T-SHIRTS/9XFyB5GZ.jpg", category: "SINISTER T-SHIRTS", description: "Blood moon with dark forest backdrop." },
      { id: "st-006", name: "SINISTER Vampire T-shirt", price: 399, image: "/T-SHIRTS/il_600x600.6818394586_r77z.jpg", category: "SINISTER T-SHIRTS", description: "Dripping blood from vampire and brand mark." },
      { id: "st-007", name: "SINISTER Haunted Forest T-shirt", price: 250, image: "/T-SHIRTS/il_600x600.6449602599_jbkm.avif", category: "SINISTER T-SHIRTS", description: "Eerie forest silhouette print." },
      { id: "st-008", name: "SINISTER Demon Owl T-shirt", price: 299, image: "/T-SHIRTS/il_600x600.7202098117_k6r0.avif", category: "SINISTER T-SHIRTS", description: "Demon wings across the back." },
      { id: "st-009", name: "SINISTER Graveyard T-shirt", price: 160, image: "/T-SHIRTS/il_600x600.6818355396_aecg.avif", category: "SINISTER T-SHIRTS", description: "Gravestones and fog composition." },
      { id: "st-010", name: "SINISTER Shining T-shirt", price: 199, image: "/T-SHIRTS/IMG-20250901-WA0028.jpg", category: "SINISTER T-SHIRTS", description: "Shining with striking red eyes." },
      { id: "st-011", name: "SINISTER Halloween T-shirt", price: 250, image: "/T-SHIRTS/il_600x600.7066182110_dlvb.avif", category: "SINISTER T-SHIRTS", description: "Halloween-themed and occult glyphs." },
      { id: "st-012", name: "SINISTER Radiant T-shirt", price: 350, image: "/T-SHIRTS/il_1588xN.7101044322_bupz.jpg", category: "SINISTER T-SHIRTS", description: "Radiant green glowing T-shirt." },
      { id: "st-013", name: "SINISTER Spider T-shirt", price: 230, image: "/T-SHIRTS/IMG-20250901-WA0031.jpg", category: "SINISTER T-SHIRTS", description: "Intricate Spider with black widow." },
      { id: "st-014", name: "SINISTER Eye Glowing T-shirt", price: 150, image: "/T-SHIRTS/IMG-20250901-WA0030.jpg", category: "SINISTER T-SHIRTS", description: "Glowing eyes t -shirt during night." },
      { id: "st-015", name: "SINISTER Black T-shirt", price:399, image: "/T-SHIRTS/IMG-20250901-WA0027.jpg", category: "SINISTER T-SHIRTS", description: "Famous Black Sinister T-shirt." },
      { id: "st-016", name: "SINISTER Red Skull Haunted T-shirt", price: 599, image: "/T-SHIRTS/J4YxlUhe.jpg", category: "SINISTER T-SHIRTS", description: "Witch hat and cauldron chest print." },
      { id: "st-017", name: "SINISTER Ghost T-shirt", price: 300, image: "/T-SHIRTS/IMG-20250901-WA0029.jpg", category: "SINISTER T-SHIRTS", description: "Ethereal spirit motif." },
      { id: "st-018", name: "SINISTER Haunted Ghost T-shirt", price: 649, image: "/T-SHIRTS/L6RTHOsA.jpg", category: "SINISTER T-SHIRTS", description: "Freakinh horror screaming ghost." },
      { id: "st-019", name: "SINISTER Gargoyle T-shirt", price: 350, image: "/T-SHIRTS/UL7HVISn.jpg", category: "SINISTER T-SHIRTS", description: "Stone gargoyle in relief print." },
      { id: "st-020", name: "SINISTER Nightmare T-shirt", price: 250, image: "/T-SHIRTS/s-l1200.jpg", category: "SINISTER T-SHIRTS", description: "Abstract nightmare art on tee." },
    ],
  },

  /* ---------------- WATCHES ---------------- */
  {
    id: "sinister-watches",
    name: "SINISTER WATCHES",
    description: "Time runs out with our haunting timepiece collection",
    image: "/WATCHES/23234130-a042-4c6f-9964-236cb90add8c.jpeg",
    products: [
      { id: "sw-001", name: "SINISTER Blood Red Chrono", price: 1299, image: "/WATCHES/23234130-a042-4c6f-9964-236cb90add8c.jpeg", category: "SINISTER WATCHES", description: "Blood red dials and cracked leather strap." },
      { id: "sw-002", name: "SINISTER Toxic Red Watch", price: 1299, image: "/WATCHES/4d361387-4a69-4955-a13b-f08d57156dc1.jpeg", category: "SINISTER WATCHES", description: "Toxic Red glow and heavy bezel." },
      { id: "sw-003", name: "SINISTER Midnight Watch", price: 1399, image: "/WATCHES/a8ca9cad-7552-4be3-b744-99d8bbe9a5cf.jpeg", category: "SINISTER WATCHES", description: "Midnight time with white accents." },
      { id: "sw-004", name: "SINISTER Skull Watch", price: 1499, image: "/WATCHES/51a07230-69d1-4c68-8a5c-56b4be7336bc.jpeg", category: "SINISTER WATCHES", description: "Skull face with ornate markers." },
      { id: "sw-005", name: "SINISTER Demon Eye Chrono", price: 1699, image: "/WATCHES/il_340x270.7080834511_bz07.webp", category: "SINISTER WATCHES", description: "Eye-like center with luminous ring." },
      { id: "sw-006", name: "SINISTER Raven Timepiece", price: 1399, image: "/WATCHES/38fd3c5c-40c9-4962-b23e-ef1f66c46c9e.jpeg", category: "SINISTER WATCHES", description: "Feather texture and engraving." },
      { id: "sw-007", name: "SINISTER Black Chrono", price: 1599, image: "/WATCHES/41c2b087-10ef-4fa9-9d7a-3cdc19d228dc.jpeg", category: "SINISTER WATCHES", description: "Occult face with pentagram hour ring." },
      { id: "sw-008", name: "SINISTER Bat Watch", price: 1449, image: "/WATCHES/71IAPQMcseL.jpg", category: "SINISTER WATCHES", description: "Spider web dial with slim hands." },
      { id: "sw-009", name: "SINISTER Vampire Watch", price: 1799, image: "/WATCHES/53176aee-15e8-4cf0-adf6-256f62d50573.jpeg", category: "SINISTER WATCHES", description: "Fang-shaped markers and blood accents." },
      { id: "sw-010", name: "SINISTER Orange Chrono", price: 1599, image: "/WATCHES/92893f1d-0100-445f-ae9a-e19ef4cce84b.jpeg", category: "SINISTER WATCHES", description: "Orange Radiant Watche." },
      { id: "sw-011", name: "SINISTER Batwing Watch", price: 1349, image: "/WATCHES/il_1588xN.5263746574_icnf.webp", category: "SINISTER WATCHES", description: "Bat wing motif across the dial." },
      { id: "sw-012", name: "SINISTER Coffin Timepiece", price: 1749, image: "/WATCHES/3f6c8a7d-ef5d-42f4-9e90-001d08508101.jpeg", category: "SINISTER WATCHES", description: "Coffin-shaped face and grave engraving." },
      { id: "sw-013", name: "SINISTER Ghost Dial Watch", price: 1499, image: "/WATCHES/il_340x270.7133276748_opfu.webp", category: "SINISTER WATCHES", description: "Ethereal dial with subtle lume." },
      { id: "sw-014", name: "SINISTER Witch Hourpiece", price: 1599, image: "/WATCHES/il_1588xN.7036179896_p4lk.webp", category: "SINISTER WATCHES", description: "Witch motifs and runic markers." },
      { id: "sw-015", name: "SINISTER Cat Shadows", price: 1899, image: "/WATCHES/il_1588xN.5263746544_8urf.webp", category: "SINISTER WATCHES", description: "Shadow textured bezel and relief markers." },
      { id: "sw-016", name: "SINISTER Reaper Clock", price: 1999, image: "/WATCHES/image-Photoroom-2024-06-09T170846.457.webp", category: "SINISTER WATCHES", description: "Scythe motif and black cat." },
      { id: "sw-017", name: "SINISTER Halloween Forest", price: 2199, image: "/WATCHES/il_1588xN.5266771716_asig.webp", category: "SINISTER WATCHES", description: "Halloween, Forest engraving and flame hands." },
      { id: "sw-018", name: "SINISTER Halloween Wristwatch", price: 1449, image: "/WATCHES/il_1588xN.7213044850_iryx.jpg", category: "SINISTER WATCHES", description: "Decayed-Pumpkins and aged strap." },
      { id: "sw-019", name: "SINISTER Demon Cat Watch", price: 2299, image: "/WATCHES/il_1588xN.7258745289_2jh7.jpg", category: "SINISTER WATCHES", description: "Cat around the bezel and fiery." },
      { id: "sw-020", name: "SINISTER Nightmare Chronograph", price: 2499, image: "/WATCHES/3aef611b-e443-476c-9a55-4b7e4fae2e70.jpeg", category: "SINISTER WATCHES", description: "Abstract nightmare dial with multi-chronograph." },
    ],
  },

] // end collections

/* ---------------- Promotional banners ---------------- */
export const promotionalBanners = [
  {
    id: "mega-sale",
    title: "SINISTER MEGA SALE - 50% OFF EVERYTHING",
    subtitle: "Limited time offer - All SINISTER collections at spine-chilling prices",
    image: "/promotions/sinister-horror-sale-banner-with-red-eyes-and-50--.jpg",
    discount: "50% OFF EVERYTHING + FREE SHIPPING",
    isActive: true,
  },
  {
    id: "tshirt-launch",
    title: "SINISTER T-SHIRTS LAUNCHED",
    subtitle: "FREE T-SHIRT with autograph for first 25 movie bookings",
    image: "/promotions/WhatsApp Image 2025-10-05 at 22.05.27_b4c1d52d.jpg",
    discount: "FREE AUTOGRAPHED T-SHIRT",
    isActive: true,
  },
  {
    id: "watch-collection",
    title: "SINISTER WATCH COLLECTION",
    subtitle: "TIME RUNS OUT WITH OUR HAUNTING TIMEPIECES",
    image: "/promotions/WhatsApp Image 2025-10-05 at 22.05.28_993243d5.jpg",
    discount: "LIMITED EDITION - ONLY 666 PIECES",
    isActive: true,
  },
  {
    id: "accessories-sale",
    title: "SINISTER ACCESSORIES COLLECTION",
    subtitle: "COMPLETE YOUR DARK TRANSFORMATION",
    image: "/promotions/WhatsApp Image 2025-10-05 at 22.05.27_e3ab9b57.jpg",
    discount: "BUY 2 GET 1 FREE",
    isActive: true,
  },
  {
    id: "new-arrivals",
    title: "NEW SINISTER ARRIVALS",
    subtitle: "Fresh nightmares added to our cursed collection",
    image: "/promotions/WhatsApp Image 2025-10-05 at 22.05.26_592857f0.jpg",
    discount: "EARLY BIRD 30% OFF",
    isActive: true,
  },
]

export default collections
