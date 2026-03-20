import type { Broker } from "@/types/broker";

export const DEFAULT_BROKER_AVATAR = "/brokers/defaultAvatar.jpg";
export const TEAM_WIDE_IMAGE = "/brokers/bigpic.jpg";

export const BROKERS: Broker[] = [
  {
    id: "b1",
    name: "Natanel Moshe Junger",
    area: "",
    phone: "+972-58-320-5970",
    email: "nm@jhrisrael.com",
    photoUrl: "natanel.jpg",
    role: "Co Founder, Managing Broker",
    phone_us: "+1-914-826-8785",
  },
  {
    id: "b2",
    name: "Yaakov Mechlovitz",
    area: "",
    phone: "+972-52-616-6178",
    email: "yaakov@jhrisrael.com",
    photoUrl: "yaakov.jpg",
    role: "Co Founder, Managing Broker",
    phone_us: "+1-646-921-8933",
  },
  {
    id: "b3",
    name: "Sarah Benchetrit",
    area: "",
    phone: "",
    email: "sarah@jhrisrael.com",
    photoUrl: "",
    role: "Client Advisor",
    phone_us: "",
  },
  {
    id: "b4",
    name: "Elisheva Stern",
    area: "",
    phone: "",
    email: "office@jhrisrael.com",
    photoUrl: "",
    role: "Office Administrator",
    phone_us: "",
  },
];

const BROKER_BY_ID = new Map(BROKERS.map((broker) => [broker.id, broker]));

const BROKER_NAME_ALIASES: Record<string, string> = {
  "sarah bencherit": "b3",
  "sarah benchetrit": "b3",
  "natanel moshe junger": "b1",
  "yaakov mechlovitz": "b2",
  "elisheva stern": "b4",
};

export function getBrokerImageUrl(path?: string | null) {
  const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
  return `/brokers/${safePath}`;
}

export function getAllBrokers() {
  return BROKERS;
}

export function getBrokerById(id?: string | null) {
  if (!id) return null;
  return BROKER_BY_ID.get(id) ?? null;
}

export function getBrokersByIds(ids: readonly string[]) {
  return ids
    .map((id) => getBrokerById(id))
    .filter((broker): broker is Broker => broker !== null);
}

export function getBrokerByName(name?: string | null) {
  const normalized = name?.trim().toLowerCase();
  if (!normalized) return null;

  const aliasedId = BROKER_NAME_ALIASES[normalized];
  if (aliasedId) {
    return getBrokerById(aliasedId);
  }

  const exactMatch = BROKERS.find(
    (broker) => broker.name.trim().toLowerCase() === normalized,
  );
  if (exactMatch) return exactMatch;

  return (
    BROKERS.find((broker) =>
      broker.name.trim().toLowerCase().includes(normalized.split(/\s+/)[0] ?? ""),
    ) ?? null
  );
}
