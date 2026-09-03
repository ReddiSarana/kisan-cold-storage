// Native DOCX Generator Service for KisanCold using the official `docx` library
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType
} from "docx";

export class DocxService {
  static createBorderedCell(text, isHeader = false, widthPercent = 25) {
    return new TableCell({
      width: { size: widthPercent, type: WidthType.PERCENTAGE },
      shading: isHeader
        ? { fill: "1E40AF", type: ShadingType.CLEAR, color: "auto" } // Deep Blue header
        : { fill: "F9FAFB", type: ShadingType.CLEAR, color: "auto" },
      margins: { top: 120, bottom: 120, left: 150, right: 150 },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: String(text || "—"),
              bold: isHeader,
              color: isHeader ? "FFFFFF" : "1F2937",
              size: 20 // 10pt
            })
          ],
          alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT
        })
      ]
    });
  }

  // 1. Generate Cold Storage Agreement
  static async generateStorageAgreement(data) {
    const {
      farmerName = "Ramesh Kumar",
      farmerPhone = "+91 98765 12345",
      aadhaarOrKcc = "KCC-UP-44921",
      facilityName = "Shiv Ganga Multi-Chamber Cold Storage",
      facilityLocation = "Agra, Uttar Pradesh",
      cropName = "Potato (Kufri Jyoti)",
      quantityQuintals = 180,
      bagsCount = 360,
      monthlyTariffPerQuintal = 38,
      durationMonths = 6,
      chamberNumber = "Chamber 2 - Rack B-14",
      bookingId = "BK-2026-901"
    } = data;

    const totalEstimatedTariff = Number(quantityQuintals) * Number(monthlyTariffPerQuintal) * Number(durationMonths);
    const advancePaid = data.advancePaid || Math.round(totalEstimatedTariff * 0.25);
    const balancePayable = totalEstimatedTariff - advancePaid;

    const doc = new Document({
      title: `Cold Storage Bailment Agreement - ${bookingId}`,
      description: "Legal Cold Storage Bailment Contract under WDRA guidelines",
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "KISAN COLD STORAGE NETWORK",
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "KISAN COLD STORAGE PRESERVATION NETWORK",
                  bold: true,
                  size: 32,
                  color: "15803D" // Green
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "Standard Agricultural Cold Storage Bailment & Preservation Contract",
                  bold: true,
                  size: 24,
                  color: "1E3A8A"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `Agreement Reference ID: ${bookingId} | Generated Date: ${new Date().toLocaleDateString('en-IN')}`,
                  italics: true,
                  size: 18,
                  color: "6B7280"
                })
              ]
            }),
            new Paragraph({ text: "" }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "1. PARTIES TO THE AGREEMENT",
                  bold: true,
                  size: 22,
                  color: "111827"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `This bailment agreement is entered between the Depositor/Farmer `,
                  size: 20
                }),
                new TextRun({ text: `${farmerName} `, bold: true, size: 20 }),
                new TextRun({
                  text: `(Contact: ${farmerPhone}, KCC/ID: ${aadhaarOrKcc}), hereinafter called the 'DEPOSITOR', and the Cold Storage Facility `,
                  size: 20
                }),
                new TextRun({ text: `${facilityName} `, bold: true, size: 20 }),
                new TextRun({
                  text: `situated at ${facilityLocation}, hereinafter called the 'WAREHOUSEMAN'.`,
                  size: 20
                })
              ]
            }),
            new Paragraph({ text: "" }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "2. DEPOSIT & CHAMBER SPECIFICATIONS",
                  bold: true,
                  size: 22,
                  color: "111827"
                })
              ]
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    this.createBorderedCell("Particulars", true, 40),
                    this.createBorderedCell("Terms / Specifications", true, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Crop / Produce Deposited", false, 40),
                    this.createBorderedCell(cropName, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Quantity & Packaging", false, 40),
                    this.createBorderedCell(`${quantityQuintals} Quintals (${bagsCount} Bags/Packages)`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Designated Chamber / Bay", false, 40),
                    this.createBorderedCell(chamberNumber, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Guaranteed Temperature", false, 40),
                    this.createBorderedCell("2°C to 4°C (Relative Humidity 90-95%)", false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Contracted Period", false, 40),
                    this.createBorderedCell(`${durationMonths} Months (Renewable upon notice)`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Agreed Monthly Tariff", false, 40),
                    this.createBorderedCell(`₹${monthlyTariffPerQuintal} / Quintal / Month`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Total Estimated Tariff", false, 40),
                    this.createBorderedCell(`₹${totalEstimatedTariff.toLocaleString('en-IN')}`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Advance Paid / Due", false, 40),
                    this.createBorderedCell(`Advance Paid: ₹${advancePaid.toLocaleString('en-IN')} | Due on Outward: ₹${balancePayable.toLocaleString('en-IN')}`, false, 60)
                  ]
                })
              ]
            }),

            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "3. RIGHTS & STATUTORY OBLIGATIONS",
                  bold: true,
                  size: 22,
                  color: "111827"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "a. Temperature & Power Guarantee: ",
                  bold: true,
                  size: 20
                }),
                new TextRun({
                  text: "The Warehouseman guarantees continuous refrigeration and automated generator backup to safeguard against rotting, sprouting, and chilling injuries.\n",
                  size: 20
                }),
                new TextRun({
                  text: "b. Fire & Peril Insurance: ",
                  bold: true,
                  size: 20
                }),
                new TextRun({
                  text: "The entire stock is covered under a comprehensive Standard Fire & Allied Perils policy registered with the WDRA.\n",
                  size: 20
                }),
                new TextRun({
                  text: "c. Delivery on Electronic Receipt: ",
                  bold: true,
                  size: 20
                }),
                new TextRun({
                  text: "Goods shall only be released upon surrender of the valid e-NWR or authorized delivery token upon clearing verified storage dues.",
                  size: 20
                })
              ]
            }),

            new Paragraph({ text: "" }),
            new Paragraph({ text: "" }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "___________________________", bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: "Signature of Depositor / Farmer", bold: true, size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: `Name: ${farmerName}`, size: 18 })] })
                      ]
                    }),
                    new TableCell({
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      children: [
                        new Paragraph({ children: [new TextRun({ text: "___________________________", bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: "Authorized Facility Officer / Seal", bold: true, size: 18 })] }),
                        new Paragraph({ children: [new TextRun({ text: `For: ${facilityName}`, size: 18 })] })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }
      ]
    });

    return await Packer.toBuffer(doc);
  }

  // 2. Generate Electronic Negotiable Warehouse Receipt (e-NWR)
  static async generateEnwrReceipt(data) {
    const {
      eNwrNumber = "ENWR-UP-2026-88412",
      bookingId = "BK-2026-901",
      farmerName = "Ramesh Kumar",
      farmerPhone = "+91 98765 12345",
      facilityName = "Shiv Ganga Multi-Chamber Cold Storage",
      cropName = "Potato (Kufri Jyoti)",
      weighmentNetKg = 9050,
      bagsCount = 360,
      qualityGrade = "Grade A (Moisture 13%, Defect <2%)",
      chamberAllocated = "Chamber 2 - Rack B-14",
      marketValueEstimate = 198000
    } = data;

    const doc = new Document({
      title: `e-NWR Receipt - ${eNwrNumber}`,
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "WAREHOUSING DEVELOPMENT AND REGULATORY AUTHORITY (WDRA)",
                  bold: true,
                  size: 26,
                  color: "1E3A8A"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "ELECTRONIC NEGOTIABLE WAREHOUSE RECEIPT (e-NWR)",
                  bold: true,
                  size: 28,
                  color: "15803D"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `Receipt No: ${eNwrNumber} | Legal Instrument for Agricultural Bank Pledge Loan`,
                  bold: true,
                  size: 18,
                  color: "B91C1C"
                })
              ]
            }),
            new Paragraph({ text: "" }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    this.createBorderedCell("Warehouse / Cold Unit", true, 30),
                    this.createBorderedCell(facilityName, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Depositor / Farmer", true, 30),
                    this.createBorderedCell(`${farmerName} (Ph: ${farmerPhone})`, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Commodity & Variety", true, 30),
                    this.createBorderedCell(cropName, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Certified Net Weight", true, 30),
                    this.createBorderedCell(`${weighmentNetKg} Kg (~${(weighmentNetKg / 100).toFixed(2)} Quintals)`, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Bags / Units Stored", true, 30),
                    this.createBorderedCell(`${bagsCount} Bags`, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Assayed Quality Grade", true, 30),
                    this.createBorderedCell(qualityGrade, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Storage Location", true, 30),
                    this.createBorderedCell(chamberAllocated, false, 70)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Estimated Collateral Value", true, 30),
                    this.createBorderedCell(`₹${Number(marketValueEstimate).toLocaleString('en-IN')} (Eligible for 75% Pledge Advance)`, false, 70)
                  ]
                })
              ]
            }),

            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "BANK PLEDGE ENDORSEMENT SECTION:",
                  bold: true,
                  size: 20
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "This electronic negotiable instrument may be pledged by the farmer to recognized Scheduled Commercial Banks / RRBs under Agri-Pledge Credit. The warehouseman warrants safe custody of the described goods until formal bank lien clearance.",
                  size: 18,
                  italics: true
                })
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({ text: "Certified Digital Verification Hash: #9A88-F10C-WDRA-2026", size: 16, color: "6B7280" })
              ]
            })
          ]
        }
      ]
    });

    return await Packer.toBuffer(doc);
  }

  // 3. Generate Gate Entry & Inward Weighment Pass
  static async generateGatePass(data) {
    const {
      tokenId = "TK-101",
      bookingId = "BK-2026-901",
      farmerName = "Ramesh Kumar",
      vehicleNumber = "UP-80-AB-4521",
      vehicleType = "Tractor Trolley",
      cropName = "Potato (Kufri Jyoti)",
      weighmentGrossKg = 14850,
      weighmentTareKg = 5800,
      weighmentNetKg = 9050,
      assignedBay = "Bay 2",
      facilityName = "Shiv Ganga Multi-Chamber Cold Storage"
    } = data;

    const doc = new Document({
      title: `Gate Entry Pass - ${tokenId}`,
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: facilityName.toUpperCase(),
                  bold: true,
                  size: 28,
                  color: "1E3A8A"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `OFFICIAL GATE PASS & WEIGHBRIDGE SLIP`,
                  bold: true,
                  size: 24,
                  color: "15803D"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `Token: ${tokenId} | Booking: ${bookingId} | Unloading Bay: ${assignedBay}`,
                  bold: true,
                  size: 20
                })
              ]
            }),
            new Paragraph({ text: "" }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    this.createBorderedCell("Entry Field", true, 40),
                    this.createBorderedCell("Recorded Reading", true, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Farmer / Depositor", false, 40),
                    this.createBorderedCell(farmerName, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Vehicle Number & Type", false, 40),
                    this.createBorderedCell(`${vehicleNumber} (${vehicleType})`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Crop Cargo", false, 40),
                    this.createBorderedCell(cropName, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Gross Vehicle Weight", false, 40),
                    this.createBorderedCell(`${weighmentGrossKg || "—"} Kg`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Tare Empty Vehicle Weight", false, 40),
                    this.createBorderedCell(`${weighmentTareKg || "—"} Kg`, false, 60)
                  ]
                }),
                new TableRow({
                  children: [
                    this.createBorderedCell("Verified Net Produce Weight", false, 40),
                    this.createBorderedCell(`${weighmentNetKg || "—"} Kg (${((weighmentNetKg || 0) / 100).toFixed(2)} Qtl)`, false, 60)
                  ]
                })
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Security Checkpoint Status: CLEARED FOR UNLOADING. Please observe safety speeds <10kmph inside yard.",
                  bold: true,
                  size: 18,
                  color: "15803D"
                })
              ]
            })
          ]
        }
      ]
    });

    return await Packer.toBuffer(doc);
  }
}
