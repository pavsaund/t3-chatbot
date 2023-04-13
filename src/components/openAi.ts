export const postOpenAIMessage = async (prompt: string): Promise<string> => {
    try {

        const response = await fetch(`https://api.openai.com/v1/engines/${process.env.NEXT_PUBLIC_OPENAI_ENGINE || ''}/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                n: 1,
                stop: '\n',
            })
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (data && data.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const err = data as ErrorMessage;
            return `Error: ${err.error.message || ""}`
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const message = data.choices[0].text.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return message;
    } catch (err) {
        return `Error contacting OpenAI`
    }
}

export const postCompletion = async (prompt: string, model?: string): Promise<string> => {
    try {

        const response = await fetch(`https://api.openai.com/v1/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model || process.env.NEXT_PUBLIC_OPENAI_COMPLETION_MODEL || '',
                prompt: prompt,
                max_tokens: 7,
                temperature: 0,
            })
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (data && data.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const err = data as ErrorMessage;
            return `Error: ${err.error.message || ""}`
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const message = data.choices[0].text.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return message;
    } catch (err) {
        return `Error contacting OpenAI`
    }
}
export const postCompletionWithPrompt = async (prompt: string, model?: string): Promise<string> => {
    try {

        const response = await fetch(`https://api.openai.com/v1/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model || process.env.NEXT_PUBLIC_OPENAI_COMPLETION_MODEL || '',
                prompt: generatePrompt(prompt),
                max_tokens: 50,
                temperature: 0.6,
            })
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (data && data.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const err = data as ErrorMessage;
            return `Error: ${err.error.message || ""}`
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const message = data.choices[0].text.trim();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return message;
    } catch (err) {
        return `Error contacting OpenAI`
    }
}


export type ErrorMessage = {
    error: {
        message?: string;
        code?: string;
        param?: string;
        type?: string;
    }
};

function generatePrompt(prompt: string) {
    return `
Q: Where do I find Vessel Work Order Information?
A: Table CUGEX1
Q: What is in MILOMA table?
A: Lot Metadata
Q: Where do I find Facility data?
A: CFACIL Table
Q: What is in CSYTAB table?
A: Planning Area data

Q: What is MSUBTF? A: MF: Substitution Table - Features 0/(HP)
Q: What is MSUIRF? A: TF: Surplus inventory return facility
Q: What is MSUIRW? A: TF: Surplus inventory return warehouse
Q: What is MSUIRH? A: TF: Surplus inventory return header
Q: What is MSUPHI? A: TF: Supply Chain History
Q: What is MSUPBO? A: TF: Supply Backorder
Q: What is MSUPFC? A: MF: Purchase Remainder text 0/(LD)
Q: What is MSVIAC? A: MF: Ship-via address connection 0/(MC)
Q: What is MSYTXH? A: MF: Text head 2/(TH)
Q: What is MSYTXL? A: MF: Text line 2/(TL)
Q: What is MTEFHS? A: MF: Custom field information value FHS 0/(UI)
Q: What is MTEFLA? A: MF: Technical fields validation 0/(UA)
Q: What is MTEGCN? A: MF: Group connected 0/(UH)
Q: What is MTEFLD? A: MF: Technical fields 0/(UF)
Q: What is MTEFLG? A: MF: Custom field per group 0/(UG)
Q: What is MTITHE? A: TF: Transaction interface, head 1/(TH)
Q: What is MTEINF? A: MF: Custom field information value 0/(UI)
Q: What is MTIPPR? A: MF: TEI partners 1/(TE)
Q: What is MTITDE? A: TF: Transaction interface, detail 1/(TD)
Q: What is MTMABS? A: TF: Absence transactions 1/(AB)
Q: What is MTITRP? A: TF: TEI Report version 1/(TR)
Q: What is MTMABT? A: MF: Time parameters for time-type on absence0/(AA)
Q: What is MTMDAB? A: MF: Absence transaction per day 1/(DA)
Q: What is MTMACD? A: MF: Absence code 0/(AC)
Q: What is MTMAIT? A: MF: Translation table coding level 2 0/(SH)
Q: What is MTMHS1? A: MF: Presence/Absence time, history 1/(H1)
Q: What is MTMHS2? A: TF: Time transaction History 1/(H2)
Q: What is MTMHS3? A: HF: History of come and go transactions 1/(H3)
Q: What is MTMPBL? A: MF: Acc. time per period, emno and type 1/(PB)
Q: What is MTMOVP? A: MF: Log of Overtime per period 0/(OP)
Q: What is MTMPRD? A: MF: Activity time per day 0/(PD)
Q: What is MTMPRE? A: MF: Activity time 0/(PT)
Q: What is MTMSEM? A: MF: Accumulatet time person and balance typ1/(ST)
Q: What is MTMPRI? A: MF: Activity identity 0/(PR)
Q: What is MWFRSH? A: WF: Freight shipment (FS)
Q: What is MTMSFD? A: MF: Statistic field 1/(SF)
Q: What is MTMTEM? A: MF: Presence/Absence time temporary file 0/(TE)
Q: What is MTMTMP? A: MF: Presence/Absence time temporary file 0/(TM)
Q: What is MTMTPR? A: MF: Time definitions
Q: What is MTMTPS? A: MF: Time parameters for o-time, temporary fi0/(TS)
Q: What is MTMTR1? A: MF: Presence/Absence time 1/(T1)
Q: What is MTMTR2? A: WF: Time types for a person during one week 1/(TR)
Q: What is MTMTTR? A: TF: Time transaction 1/(TR)
Q: What is MTMTTY? A: MF: Time types
Q: What is MTROLU? A: MF: Territorial roll-up transactions 1/(MC)
Q: What is MWARDT? A: Warranty Disposal Days
Q: What is MWASHE? A: TF: Allocation Synchronization Rounds (TJ)
Q: What is MUPSTR? A: MF: Upstream Rules
Q: What is MWASHI? A: TF: Allocation Synchronization History (TH)
Q: What is MVARDS? A: MF: Various descriptions 0/(LV)
Q: What is MVENST? A: HF: Vendor statistics 1/(IV)
Q: What is MVXCONGB? A: 
Q: What is MVXMSGGB? A: 
Q: What is MWAROP? A: Warranty Ticket
Q: What is MWASMG? A: TF: Allocation Synchronization Messages (TD)
Q: What is MWASLN? A: TF: Allocation Synchronization Errors (TB)
Q: What is MWDSTP? A: TF: MO Disturbance codes by work center 1/(M3)
Q: What is MINVSH? A: TF: Inventory sharing
Q: What is MWDEOP? A: WF: Co-planning Demand Order 1/(AE)
Q: What is MWFDLY? A: WF: Created Firm delivery no
Q: What is MWDSTC? A: MF: MO Disturbance codes
Q: What is MWINST? A: TF: Packing instruction header
Q: What is MWFRDE? A: WF: Freight delivery (FD)
Q: What is MWFRDO? A: WF: Freight details origin
Q: What is MWGRET? A: MF: Goods receipt entry panel setup paramete0/(NL)
Q: What is MWHTAB? A: MF: Warehouse Table 0/(WH)
Q: What is MWINSL? A: TF: Packing instruction line 1/(P2)
Q: What is MWINSQ? A: TF: Packing instruction quantity 1/(P5)
Q: What is MWINS1? A: TF: Packing instruction consignee 1/(P6) Temp
Q: What is MWLOAD? A: TF: Planning group workload / Year(definitiv1/(VL)
Q: What is MWM181? A: WF: Joint allocation 1/(HF)
Q: What is MWINSH? A: TF: Packing instruction header
Q: What is MWM410? A: WF: Delivery MI workfile 1/(LP)
Q: What is MWINSM? A: TF: Matrix outprint Work 1/(P1)
Q: What is MWM420? A: WF: Picklist report 1/(MZ)
Q: What is MWINSP? A: TF: Packing instruction package
Q: What is MWIPLT? A: WF: Trigger planning template calculation/(MW)
Q: What is MWM422? A: WF: MITALO 1/(MZ)
Q: What is MWLEVL? A: WF: Co-planning group leveling 1/(AD)
Q: What is MWM120? A: WF: Style view in MWS120/B3 1/(MZ)
Q: What is MWMCSN? A: WF: Customer statistical no. 1/(CS)
Q: What is MWM424? A: WF: Style 1/(MZ)
Q: What is MWM421? A: WF: Wave lines 1/(MZ)
Q: What is MWOOPA? A: MF: Attributes per routing 0/(Q8)
Q: What is MWOOPE? A: TF: MO operation file
Q: What is MWOOPL? A: TF: Operation log of start and stop 1/(SS)
Q: What is MWM436? A: WF: Matix pick list 1/(MZ)
Q: What is MWOOPS? A: TF: Routing operation activity description 1/(VQ)
Q: What is MWOPHA? A: TF: Work order used phantoms 1/(VV)
Q: What is MWM444? A: WF: Departure date/item/B3 1/(MZ)
Q: What is MWOEMT? A: TF: Employee connection to a work group 1/(ET)
Q: What is MWMPAG? A: WF: Package groups 1/(MP)
Q: What is MWMTDG? A: WF: TEI Detail groups 1/(TD)
Q: What is MWOAPP? A: MF: Work with orderheaders /(PF)
Q: What is MWOCPN? A: TF: Coproduct per operationnumber 1/(VS)
Q: What is MWODAY? A: TF: Operation time per day 1/(DA)
Q: What is CRS679JD? A: Lst: Tags - join dynamic - MWOHED/HITMAS 0/(VH)
Q: What is MWOHEH? A: TF: Work order head 1/(VH)
Q: What is MWOMAT? A: TF: MO material file
Q: What is MWOHES? A: TF: Work order head 1/(V7)
Q: What is MWOMAA? A: TF: Alt. Material - Manufacturing Order 1/(VA)
Q: What is MMO912? A: WF: Breakdown planning proposal from MWOPLP 1/(ZA)
Q: What is MWOOP1? A: TF: MO operations appendix 1/(V1)
Q: What is MWOPLA? A: TF: Service history
Q: What is MWOPLD? A: MF: Service History - Doc Revsion 0/(QD)
Q: What is MWOPTH? A: TF: Cumulative operation trans hist actual
Q: What is MWQIRS? A: TF: MO inspection results 1/(M7)
Q: What is MWRREM? A: TF: MO reporting remarks 1/(M8)
Q: What is MWS427JD? A: WF: Not printed picklist
Q: What is MWOPLW? A: MF: Service History - WO 0/(QW)
Q: What is MWS428JD? A: WF: Printed picklist
Q: What is MWOPOL? A: TF: Work Order Production Lots 1/(BH)
Q: What is MWOPTR? A: TF: Operation transaction 1/(DJ)
Q: What is MWOPTP? A: TF: Cumulative oper trans per acc ent
Q: What is MWS810JD? A: Fnc: Item FD Qualify/Delete/File /(MM)
Q: What is MWOPTS? A: TF: Cumulative operation transactions
Q: What is MWORCO? A: TF: Rate compensators per material 1/(VR)
Q: What is MWORDT? A: MF: Manufacturing ordertypes
Q: What is MWORID? A: TF: Active report ID per employee 1/(RI)
Q: What is MWOROU? A: TF: AlLternate routnings
Q: What is MWROLU? A: MF: Territorial roll-up 1/(MC)
Q: What is MWOSPL? A: TF: Work order head splitted 1/(VH)
Q: What is MWOTEA? A: TF: Team 0/(TE)
Q: What is MWOTOP? A: TF: Operation which belongs to a team 1/(DT)
Q: What is MWPLIT? A: MF: Picking list entry panel setup parameter0/(NK)
Q: What is MWPREL? A: TF: Process order relation
Q: What is MWPROP? A: WF: Propagation of delivery orders
Q: What is MWS180JD? A: Fnc: Test for joint delivery /(HE)
Q: What is MWW428? A: WF: MWS428 Pick Workload
Q: What is MWSCRE? A: WF: Active Supply Chain 1/(NB)
Q: What is MWXHED? A: TF: Planning board head receiving file 1/(VX)
Q: What is MWSEEQ? A: MF: Retrieve picking sequence
Q: What is MXBETR? A: TF: PO- batch entry transactions 1/(BE)
Q: What is OASCOL? A: MF: Assortments connected 0/(AS)
Q: What is OBCOPY? A: MF: Copy parameters for batch-order 0/(BO)
Q: What is MWTOTR? A: TF: Manufacturing order tool transactions 1/(TR)
Q: What is MWXAPP? A: TF: Work with orderproposals /(P8)
Q: What is MWXOPE? A: TF: Planning board operation receiving file 1/(VY)
Q: What is OBONST? A: MF: Bonus Status per Recipient 1/(OR)
Q: What is MWXUSR? A: MF: User update job status file for APP 0/(VZ)
Q: What is OBOPER? A: MF: Bonus Status per Recipient per Period 1/(OF)
Q: What is MXCCST? A: TF: PO-accounting Strings Batch 1/(SC)
Q: What is MXHEAD? A: TF: PO-head. Batch 1/(IA)
Q: What is OBOTRA? A: MF: B/C Transaction file 1/(OC)
Q: What is MXLINE? A: TF: PO-line. Batch 1/(IB)
Q: What is MXOEXP? A: TF: PO-charges. Batch 1/(IV)
Q: What is MXPOAD? A: TF: PO-address. Batch 1/(AD)
Q: What is MXREAL? A: TF: Pre-allocations file APP 1/(NX)
Q: What is OAGRPR? A: MF: Customer agreement, price 0/(OL)
Q: What is MXTEXT? A: TF: PO-text lines Batch 1/(TL)
Q: What is MYOPID? A: TF: Delivery OPI, download 1/(D1)
Q: What is MYOPIH? A: TF: Message header OPI 1/(D0)
Q: What is MYOPIU? A: TF: Delivery OPI, upload 1/(D1)
Q: What is MYS511JD? A: Lst: TEI Transfer outbound - join dynamic /(OQ)
Q: What is MYS512JD? A: Lst: TEI Transfer inbound - join dynamic /[IA)
Q: What is MYSELS? A: TF: Selection set OPI 1/(SE)
Q: What is OAARBB? A: WF: Selected BO batch orders for arcivate 1/(UY)
Q: What is OACREA? A: Action reason
Q: What is OADDTX? A: TF: Invoicing, additional tax description
Q: What is OAEXOR? A: MF: BO external reference
Q: What is OAGMCH? A: MF: Bonus Customer Matrix 0/(OG)
Q: What is OAGMCL? A: MF: Bonus Customer Matrix Lines 0/(BI)
Q: What is OAGMXH? A: MF: Bonus Item Matrix 0/(OL)
Q: What is OAGMXL? A: MF: Bonus Item Matrix Lines 0/(OM)
Q: What is OAGRHE? A: MF: Customer agreement - head
Q: What is OAGRLN? A: MF: Customer agreement - lines
Q: What is OAGRTP? A: MF: Customer agreement type 0/(IQ)
Q: What is OAINTY? A: MF: Advance invoice type
Q: What is OAGSET? A: MF: Agreement line selection setup 0/(AG)
Q: What is OASCUS? A: MF: Assortment per customer 0/(OC)
Q: What is OASITN? A: MF: Assortment per item 0/(OI)
Q: What is OBYPAT? A: MF: Buying pattern statistic 1/(BB)
Q: What is OBONAG? A: MF: Bonus agreement file 0/(BJ)
Q: What is OBOACP? A: MF: Bonus Allocation % 0/(OQ)
Q: What is OCASHB? A: TF: Cash desk - approvers 1/(UK)

Q: ${prompt}
A:""
`;
}
