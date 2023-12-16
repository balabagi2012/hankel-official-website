const teamD = {
  name: "dayCare",
  banner: "/banners/school.png",
  foreignTeam: {
    title: {
      en: "Leading Foreign team",
      zh: "領先的外籍團隊",
    },
    description: {
      en: "Our international team comprises carefully selected experts with extensive teaching experience in Taiwan. Recruited from around the world, they undergo professional training plans, ensuring the quality and character of foreign teachers. We introduce certified international talents, offering dual-certified, high-quality international faculty and staff. ",
      zh: "我們的國際團隊由在台灣具有豐富教學經驗的精心挑選的專家組成。他們來自世界各地，並接受專業培訓計劃，確保外籍教師的質量和品格。我們引進認證的國際人才，提供雙認證，高質量的國際教職員工。",
    },
    teachers: [
      {
        title: {
          en: "Teacher A",
          zh: "老師Ａ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/1.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
      {
        title: {
          en: "Teacher B",
          zh: "老師Ｂ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/2.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
      {
        title: {
          en: "Teacher C",
          zh: "老師Ｃ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/3.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
    ],
  },
  localTeam: {
    title: {
      en: "Local Expert team",
      zh: "本地專家團隊",
    },
    description: {
      en: "Our international team comprises carefully selected experts with extensive teaching experience in Taiwan. Recruited from around the world, they undergo professional training plans, ensuring the quality and character of foreign teachers. We introduce certified international talents, offering dual-certified, high-quality international faculty and staff. ",
      zh: "我們的國際團隊由在台灣具有豐富教學經驗的精心挑選的專家組成。他們來自世界各地，並接受專業培訓計劃，確保外籍教師的質量和品格。我們引進認證的國際人才，提供雙認證，高質量的國際教職員工。",
    },
    teachers: [
      {
        title: {
          en: "Teacher A",
          zh: "老師Ａ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/1.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
      {
        title: {
          en: "Teacher B",
          zh: "老師Ｂ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/2.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
      {
        title: {
          en: "Teacher C",
          zh: "老師Ｃ",
        },
        tag: {
          en: "Teacher | Digital Content Director",
          zh: "教師 | 數位內容總監",
        },
        description: {
          en: "Provide modern teaching equipment and an environment, including interactive whiteboards and multimedia projection equipment, promoting dynamic and interactive teaching. ",
          zh: "提供現代化的教學設備和環境，包括互動式白板和多媒體投影設備，促進動態和互動式教學。",
        },
        img: "/team/3.png",
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/",
        twitter: "https://twitter.com/",
      },
    ],
  },
};

import { connectToDatabase } from "@/utils/mongodb";
import { Text } from "../model";

export interface TeamEntity {
  name: string;
  banner: string;
  foreignTeam: Team;
  localTeam: Team;
}

export interface Team {
  title: Text;
  description: Text;
  teachers: Teacher[];
}

export interface Teacher {
  title: Text;
  tag: Text;
  description: Text;
  img: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
}

// GET /api/team
export async function GET() {
  try {
    const db = await connectToDatabase();
    const team = await db.collection("team").find({}).toArray();
    return Response.json({ team }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}

// POST /api/team
export async function POST(req: Request) {
  try {
    const { name, banner, foreignTeam, localTeam } = await req.json();
    if (!name || !banner || !foreignTeam || !localTeam) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const db = await connectToDatabase();
    const team = await db.collection("team").insertOne({
      name,
      banner,
      foreignTeam,
      localTeam,
    });
    return Response.json({ team }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create team data" },
      { status: 500 }
    );
  }
}
