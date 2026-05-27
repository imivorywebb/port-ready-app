"use client";

import { useState } from "react";
import {
  ChevronRight,
  X,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type StatusType =
  | "ACTION"
  | "ATTENTION"
  | "COMPLIANT";

type ComplianceItem = {
  title: string;
  expiration: string;
  status: StatusType;
};

type DateParts = {
  month: string;
  day: string;
  year: string;
};

// ======================================================
// DATE DATA
// ======================================================

const MONTHS = [
  { label: "JAN", value: "01" },
  { label: "FEB", value: "02" },
  { label: "MAR", value: "03" },
  { label: "APR", value: "04" },
  { label: "MAY", value: "05" },
  { label: "JUN", value: "06" },
  { label: "JUL", value: "07" },
  { label: "AUG", value: "08" },
  { label: "SEP", value: "09" },
  { label: "OCT", value: "10" },
  { label: "NOV", value: "11" },
  { label: "DEC", value: "12" },
];

const DAYS = Array.from(
  { length: 31 },
  (_, i) =>
    String(i + 1).padStart(2, "0")
);

const YEARS = Array.from(
  { length: 12 },
  (_, i) => String(2025 + i)
);

// ======================================================
// SAFE DATE HELPERS
// ======================================================

function parseLocalDate(
  dateString: string
) {
  const [year, month, day] =
    dateString.split("-").map(Number);

  const date = new Date(
    year,
    month - 1,
    day
  );

  // Prevent timezone rollback
  date.setHours(12, 0, 0, 0);

  return date;
}

function formatDate(
  dateString: string
) {
  const [year, month, day] =
    dateString.split("-");

  const monthName =
    MONTHS.find(
      (m) => m.value === month
    )?.label || month;

  return `${monthName} ${Number(
    day
  )}, ${year}`;
}

function getStatus(
  dateString: string
): StatusType {
  const today = new Date();

  today.setHours(12, 0, 0, 0);

  const expiration =
    parseLocalDate(dateString);

  const diffDays = Math.ceil(
    (expiration.getTime() -
      today.getTime()) /
      86400000
  );

  if (diffDays <= 14) {
    return "ACTION";
  }

  if (diffDays <= 45) {
    return "ATTENTION";
  }

  return "COMPLIANT";
}

function sortItems(
  items: ComplianceItem[]
) {
  return [...items].sort(
    (a, b) => {
      return (
        parseLocalDate(
          a.expiration
        ).getTime() -
        parseLocalDate(
          b.expiration
        ).getTime()
      );
    }
  );
}

// ======================================================
// APP
// ======================================================

export default function Home() {
  const [selectedCard, setSelectedCard] =
    useState<string | null>(null);

  const [dateParts, setDateParts] =
    useState<DateParts>({
      month: "10",
      day: "12",
      year: "2026",
    });

  const [items, setItems] = useState<
    ComplianceItem[]
  >(sortItems([
    // ACTION

    {
      title:
        "Annual DOT Inspection",
      expiration: "2026-07-28",
      status: "ACTION",
    },

    {
      title:
        "Hazmat Endorsement",
      expiration: "2026-07-14",
      status: "ACTION",
    },

    {
      title:
        "RFID Terminal Access",
      expiration: "2026-06-30",
      status: "ACTION",
    },

    {
      title:
        "Pull Notice Enrollment",
      expiration: "2026-08-02",
      status: "ACTION",
    },

    {
      title:
        "UCR Registration",
      expiration: "2026-07-09",
      status: "ACTION",
    },

    // ATTENTION

    {
      title:
        "Medical Examiner Certificate",
      expiration: "2026-08-08",
      status: "ATTENTION",
    },

    {
      title:
        "Cargo Insurance",
      expiration: "2026-09-18",
      status: "ATTENTION",
    },

    {
      title:
        "PierPass Registration",
      expiration: "2026-10-01",
      status: "ATTENTION",
    },

    {
      title:
        "BIT Inspection",
      expiration: "2026-08-19",
      status: "ATTENTION",
    },

    {
      title:
        "ELD Certification",
      expiration: "2026-09-11",
      status: "ATTENTION",
    },

    {
      title:
        "Clean Truck Check",
      expiration: "2026-08-22",
      status: "ATTENTION",
    },

    {
      title:
        "IFTA Renewal",
      expiration: "2026-09-30",
      status: "ATTENTION",
    },

    {
      title:
        "Vehicle Registration",
      expiration: "2026-09-14",
      status: "ATTENTION",
    },

    // COMPLIANT

    {
      title: "TWIC Card",
      expiration: "2026-10-12",
      status: "COMPLIANT",
    },

    {
      title:
        "Commercial Auto Insurance",
      expiration: "2027-01-16",
      status: "COMPLIANT",
    },

    {
      title:
        "Air Brake Certification",
      expiration: "2026-11-22",
      status: "COMPLIANT",
    },

    {
      title:
        "General Liability Insurance",
      expiration: "2026-12-08",
      status: "COMPLIANT",
    },

    {
      title:
        "Port Access Registration",
      expiration: "2026-11-02",
      status: "COMPLIANT",
    },

    {
      title: "CARB Compliance",
      expiration: "2026-12-01",
      status: "COMPLIANT",
    },

    {
      title:
        "Fire Extinguisher Inspection",
      expiration: "2026-10-28",
      status: "COMPLIANT",
    },

    {
      title:
        "Drug Consortium Enrollment",
      expiration: "2026-12-19",
      status: "COMPLIANT",
    },

    {
      title:
        "IRP Apportioned Plates",
      expiration: "2026-10-17",
      status: "COMPLIANT",
    },

    {
      title:
        "MCP Permit",
      expiration: "2026-11-08",
      status: "COMPLIANT",
    },
  ]));

  // ======================================================
  // OPEN CARD
  // ======================================================

  function openCard(title: string) {
    const item = items.find(
      (i) => i.title === title
    );

    if (!item) return;

    const [year, month, day] =
      item.expiration.split("-");

    setDateParts({
      month,
      day,
      year,
    });

    setSelectedCard(title);
  }

  // ======================================================
  // SAVE DATE
  // ======================================================

  function saveExpirationDate() {
    if (!selectedCard) return;

    const safeDate = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;

    setItems((prev) =>
      prev.map((item) => {
        if (
          item.title !== selectedCard
        ) {
          return item;
        }

        return {
          ...item,
          expiration: safeDate,
          status: getStatus(
            safeDate
          ),
        };
      })
    );

    setSelectedCard(null);
  }

  // ======================================================
  // COUNTS
  // ======================================================

  const actionCount = items.filter(
    (item) => item.status === "ACTION"
  ).length;

  const attentionCount = items.filter(
    (item) =>
      item.status === "ATTENTION"
  ).length;

  const compliantCount = items.filter(
    (item) =>
      item.status === "COMPLIANT"
  ).length;

  // ======================================================
  // UI
  // ======================================================

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_42%)]" />

      {/* Device */}
      <div className="relative w-full max-w-sm h-[92vh] rounded-[40px] bg-zinc-900 border border-zinc-800 overflow-hidden shadow-[0_0_140px_rgba(0,0,0,0.95)] flex flex-col">

        {/* Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-blue-500/10 blur-3xl rounded-full" />

        {/* Synced */}
        <div className="absolute top-8 right-6 z-20 flex items-center gap-3">

          <p className="text-[11px] uppercase tracking-[0.28em] text-zinc-500">
            Synced
          </p>

          <div className="w-4 h-4 rounded-full bg-green-400 shadow-[0_0_18px_rgba(74,222,128,0.95)]" />

        </div>

        {/* Header */}
<div className="relative z-10 px-5 pt-6 pb-3 bg-zinc-900/75 backdrop-blur-xl">

  <p className="text-blue-400 text-[11px] uppercase tracking-[0.28em]">
    PORT-READY STATUS
  </p>

  <h1 className="text-white text-[38px] leading-[0.92] font-semibold tracking-tight mt-3">
    Owner Operator
    Compliance
  </h1>

  <p className="text-zinc-400 text-lg leading-relaxed mt-4">
    Stay compliant. Avoid fines.
    Keep pulling loads.
  </p>

</div>

{/* CARDS */}
<div className="relative z-10 px-4 pt-0 pb-[140px] overflow-y-auto h-full space-y-3 scrollbar-hide">

  {/* ACTION */}
  <SectionLabel
    label="ACTION REQUIRED"
    color="text-red-400"
  />

  {items
    .filter(
      (item) =>
        item.status ===
        "ACTION"
    )
    .map((item) => (
      <OperationalCard
        key={item.title}
        title={item.title}
        subtitle={`Expires ${formatDate(
          item.expiration
        )}`}
        status={item.status}
        onClick={() =>
          openCard(
            item.title
          )
        }
      />
    ))}

          {/* ATTENTION */}
          <SectionLabel
            label="ATTENTION SOON"
            color="text-yellow-400"
          />

          {items
            .filter(
              (item) =>
                item.status ===
                "ATTENTION"
            )
            .map((item) => (
              <OperationalCard
                key={item.title}
                title={item.title}
                subtitle={`Expires ${formatDate(
                  item.expiration
                )}`}
                status={item.status}
                onClick={() =>
                  openCard(
                    item.title
                  )
                }
              />
            ))}

          {/* COMPLIANT */}
          <SectionLabel
            label="COMPLIANT"
            color="text-green-400"
          />

          {items
            .filter(
              (item) =>
                item.status ===
                "COMPLIANT"
            )
            .map((item) => (
              <OperationalCard
                key={item.title}
                title={item.title}
                subtitle={`Expires ${formatDate(
                  item.expiration
                )}`}
                status={item.status}
                onClick={() =>
                  openCard(
                    item.title
                  )
                }
              />
            ))}

        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-xl px-4 py-5">

          <div className="grid grid-cols-3 gap-3">

            <StatusCard
              label="ACTION"
              value={String(
                actionCount
              )}
              color="text-red-400"
            />

            <StatusCard
              label="ATTENTION"
              value={String(
                attentionCount
              )}
              color="text-yellow-400"
            />

            <StatusCard
              label="COMPLIANT"
              value={String(
                compliantCount
              )}
              color="text-green-400"
            />

          </div>

        </div>

        {/* FLOATING OPS PANEL */}
        {selectedCard && (
          <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="w-full max-w-[360px] rounded-[34px] border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.7)] overflow-hidden">

              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-zinc-800">

                <div>

                  <p className="text-blue-400 text-[10px] uppercase tracking-[0.28em]">
                    COMPLIANCE ITEM
                  </p>

                  <h2 className="text-white text-[28px] leading-[0.95] font-semibold tracking-tight mt-2">
                    {selectedCard}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setSelectedCard(
                      null
                    )
                  }
                  className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400"
                >
                  <X className="w-5 h-5" />
                </button>

              </div>

              {/* Content */}
              <div className="px-5 py-5 space-y-5 max-h-[72vh] overflow-y-auto scrollbar-hide">

                {/* Preview */}
                <div className="rounded-[26px] border border-zinc-700/50 bg-black/50 px-4 py-4">

                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.24em] mb-3">
                    EXPIRATION
                  </p>

                  <div className="text-white text-[26px] font-semibold tracking-tight">
                    {formatDate(
                      `${dateParts.year}-${dateParts.month}-${dateParts.day}`
                    )}
                  </div>

                </div>

                {/* Month */}
                <CompactSection label="MONTH">

                  {MONTHS.map(
                    (month) => (
                      <MiniChip
                        key={
                          month.value
                        }
                        active={
                          dateParts.month ===
                          month.value
                        }
                        onClick={() =>
                          setDateParts(
                            (
                              prev
                            ) => ({
                              ...prev,
                              month:
                                month.value,
                            })
                          )
                        }
                      >
                        {
                          month.label
                        }
                      </MiniChip>
                    )
                  )}

                </CompactSection>

                {/* Day */}
                <CompactSection label="DAY">

                  {DAYS.map((day) => (
                    <MiniChip
                      key={day}
                      active={
                        dateParts.day ===
                        day
                      }
                      onClick={() =>
                        setDateParts(
                          (
                            prev
                          ) => ({
                            ...prev,
                            day,
                          })
                        )
                      }
                    >
                      {day}
                    </MiniChip>
                  ))}

                </CompactSection>

                {/* Year */}
                <CompactSection label="YEAR">

                  {YEARS.map(
                    (year) => (
                      <MiniChip
                        key={year}
                        active={
                          dateParts.year ===
                          year
                        }
                        onClick={() =>
                          setDateParts(
                            (
                              prev
                            ) => ({
                              ...prev,
                              year,
                            })
                          )
                        }
                      >
                        {year}
                      </MiniChip>
                    )
                  )}

                </CompactSection>

              </div>

              {/* Sticky Footer */}
              <div className="border-t border-zinc-800 p-4 bg-zinc-900/95">

                <button
                  onClick={
                    saveExpirationDate
                  }
                  className="w-full rounded-[20px] bg-blue-500 py-3.5 text-white text-sm font-medium shadow-[0_0_24px_rgba(59,130,246,0.35)] transition-all duration-200 active:scale-[0.985]"
                >
                  Save Expiration Date
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}

// ======================================================
// MINI CHIP
// ======================================================

function MiniChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl py-1.5 text-[10px]
        font-medium transition-all duration-200
        ${
          active
            ? "bg-blue-500 text-white shadow-[0_0_16px_rgba(59,130,246,0.4)]"
            : "bg-zinc-800 border border-zinc-700/50 text-zinc-400"
        }
      `}
    >
      {children}
    </button>
  );
}

// ======================================================
// COMPACT SECTION
// ======================================================

function CompactSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.24em] mb-2">
        {label}
      </p>

      <div className="grid grid-cols-4 gap-2">
        {children}
      </div>

    </div>
  );
}

// ======================================================
// SECTION LABEL
// ======================================================

function SectionLabel({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div className="sticky top-0 z-20 bg-zinc-900/92 backdrop-blur-xl flex items-center gap-3 py-2 px-1">

      <div
        className={`text-[15px] uppercase tracking-[0.32em] font-semibold text-center w-full ${color}`}
      >
        {label}
      </div>

      <div className="flex-1 h-px bg-zinc-800" />

    </div>
  );
}

// ======================================================
// STATUS CARD
// ======================================================

function StatusCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-[26px] bg-zinc-800/90 border border-zinc-700/30 backdrop-blur-xl px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">

      <p className="text-zinc-400 text-[11px] uppercase tracking-[0.16em] text-center">
        {label}
      </p>

      <h3
        className={`text-3xl font-semibold mt-3 text-center ${color}`}
      >
        {value}
      </h3>

    </div>
  );
}

// ======================================================
// OPERATIONAL CARD
// ======================================================

function OperationalCard({
  title,
  subtitle,
  status,
  onClick,
}: {
  title: string;
  subtitle: string;
  status: StatusType;
  onClick: () => void;
}) {
  const colors: Record<
    StatusType,
    string
  > = {
    ACTION:
      "border-red-500/20 text-red-400",

    ATTENTION:
      "border-yellow-500/20 text-yellow-400",

    COMPLIANT:
      "border-green-500/20 text-green-400",
  };

  return (
    <button
      onClick={onClick}
      className={`
  w-full rounded-[32px]
  border ${colors[status]}
  bg-zinc-800/65
  backdrop-blur-md
  p-5 text-left
  h-[124px]
  flex flex-col justify-between
  transition-all duration-300
  hover:bg-zinc-800/85
  active:scale-[0.985]
`}
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <h2 className="text-white text-[21px] font-semibold tracking-tight">
            {title}
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed mt-2">
            {subtitle}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <p className="text-sm font-medium">
            {status}
          </p>

          <ChevronRight className="w-5 h-5 opacity-70" />

        </div>

      </div>

    </button>
  );
}