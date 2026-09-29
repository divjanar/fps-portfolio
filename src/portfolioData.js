export const R={
hall: {n: "Entrance Hall", s: "About", x0: -7, x1: 7, z0: -6, z1: 6, fl: "marble", wc: 0x25201c, lc: 0xffc27a},
chess:{n:"Chess Room",s:"Skills",x0:-21,x1:-7,z0:-6,z1:6,fl:"chess",wc:0x16283f,lc:0xbcd0ff},
garage:{n:"Garage",s:"Engineering projects",x0:7,x1:21,z0:-6,z1:6,fl:"conc",wc:0x1a1a1d,lc:0xdfe6ff},
listen:{n:"Listening Room",s:"Music & Air DJ",x0:-7,x1:7,z0:-20,z1:-6,fl:"wood",wc:0x4a0f1c,lc:0xff6a5a},
atelier:{n:"Atelier",s:"Design & fashion",x0:-21,x1:-7,z0:-20,z1:-6,fl:"wood",wc:0x4b3a2f,lc:0xffd9a0},
dining:{n:"Dining Room",s:"Life outside work",x0:7,x1:21,z0:-20,z1:-6,fl:"wood",wc:0x5b2f18,lc:0xffb060},
study:{n:"Study",s:"Experience & contact",x0:-7,x1:7,z0:-34,z1:-20,fl:"wood",wc:0x2a1a12,lc:0xffc070}};
export const DOORS=[["hall","chess","x",-7,0],["hall","garage","x",7,0],["hall","listen","z",-6,0],["chess","atelier","z",-6,-14],["garage","dining","z",-6,14],["listen","study","z",-20,0],["hall",null,"z",6,0]];
const PJ={r:"[Placeholder] Your role",k:"[Placeholder] Technologies",l:[["Live demo","https://example.com"],["Source","https://github.com"]]};
export const C={
about:["hall","About Me","Hi, I'm Div, an engineering student who builds React front-end applications and likes making software feel like a place.\n\n[Placeholder] Add your short bio here."],
edu:["hall","Education","[Placeholder] University, programme, expected graduation, relevant coursework."],
king:["chess","How I approach problems","[Placeholder] Clarify the goal, prototype quickly, test with real people, iterate."],
queen:["chess","Frontend & React","React, component design and interface polish. [Placeholder] Add libraries, patterns and proof."],
knight:["chess","Tools & workflow","[Placeholder] Git, editors, build tools, testing, deployment."],
bishop:["chess","Hardware & embedded","ESP32 and sensors, as used in Air DJ. [Placeholder] Add more."],
rook:["chess","Languages","[Placeholder] JavaScript/TypeScript, Python, C/C++ and others."],
pawn:["chess","Always learning","[Placeholder] What you are learning now and how you learn fast."],
gp1:["garage","Project One","[Placeholder] One-paragraph summary: the problem, your approach, the result.",PJ],
gp2:["garage","Project Two","[Placeholder] One-paragraph summary.",PJ],
gp3:["garage","Project Three","[Placeholder] One-paragraph summary.",PJ],
carcredit: [
  "garage",
  "Porsche 911 model credit",
  "Porsche 911 with interior by n.brizitskaya, licensed under Creative Commons Attribution 4.0.",
  {
    l: [
      [
        "View model",
        "https://sketchfab.com/3d-models/porsche-911-with-interior-877b1bc1739f4a2bb65d62fd7ffd9f75"
      ],
      [
        "License",
        "https://creativecommons.org/licenses/by/4.0/"
      ]
    ]
  }
],
airdj:["listen","Air DJ","Air DJ is a gesture-controlled DJ setup: a camera reads your hands with computer vision, gestures drive audio playback and effects, and an ESP32 display shows the live state.\n\n[Placeholder] Explain the gesture mapping, the audio pipeline, the hardware build and add a demo video.",{r:"[Placeholder] Your role",k:"Computer vision · Audio · ESP32 display · [Placeholder] exact stack",l:[["Demo video","https://example.com"],["Source","https://github.com"]]}],
music:["listen","Music","[Placeholder] What you listen to, playlists, favourite records, how music shapes how you build."],
design:["atelier","Product design","[Placeholder] A product design case study: problem, process, outcome.",PJ],
uiux:["atelier","UI / UX","[Placeholder] A UI/UX case study with screens and decisions.",PJ],
fashion:["atelier","Fashion & creative interests","[Placeholder] Fabrics, silhouettes and references that inspire your work."],
hobbies:["dining","Hobbies","[Placeholder] What you do when you close the laptop."],
food:["dining","Food & dessert","[Placeholder] Favourite things to cook, bake and eat."],
bear:["dining","The bear","You found the easter egg. [Placeholder] Tell the story of the teddy bear."],
exp1:["study","Experience: role one","[Placeholder] Company, dates, what you did, what you shipped.",{r:"[Placeholder] Title",k:"[Placeholder] Technologies"}],
exp2:["study","Experience: role two","[Placeholder] Company, dates, what you did.",{r:"[Placeholder] Title",k:"[Placeholder] Technologies"}],
resume:["study","Resume","[Placeholder] Link your resume PDF here.",{l:[["Resume (PDF)","https://example.com"]]}],
contact:["study","Let's connect","The journey ends here, but the conversation doesn't have to. [Placeholder] Add your email and links.",{l:[["Email","mailto:you@example.com"],["LinkedIn","https://linkedin.com"],["GitHub","https://github.com"]]}]};
