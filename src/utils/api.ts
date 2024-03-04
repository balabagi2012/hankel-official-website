import { AboutEntity } from "@/app/api/about/route";
import { ContactEntity } from "@/app/api/contact/route";
import { CurriculumEntity } from "@/app/api/curriculum/route";
import { FacilityEntity } from "@/app/api/facility/route";
import { InformationEntity } from "@/app/api/information/route";
import { TeamEntity } from "@/app/api/team/route";

export async function getAbout(name: string): Promise<AboutEntity> {
  const res = await fetch(`${process.env.API_URI}/api/about/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const getContact = async (name: string): Promise<ContactEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/contact/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const getHome = async () => {
  const res = await fetch(`${process.env.API_URI}/api/home`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const getInformation = async (
  name: string
): Promise<InformationEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/information/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getCurriculum = async (
  name: string
): Promise<CurriculumEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/curriculum/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getFacility = async (name: string): Promise<FacilityEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/facility/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getTeam = async (name: string): Promise<TeamEntity> => {
  const res = await fetch(`${process.env.API_URI}/api/team/${name}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
