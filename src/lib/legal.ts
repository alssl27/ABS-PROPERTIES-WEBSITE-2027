export const legalPages: Record<
  string,
  {
    title: string;
    description: string;
    sections: { heading: string; text: string }[];
  }
> = {
  privacy: {
    title: "Privacy notice",
    description: "Placeholder for the ABS Properties privacy notice.",
    sections: [
      {
        heading: "Current demonstration behaviour",
        text: "This demonstration has no enquiry backend, analytics, advertising trackers or application database. Enquiry preview values stay in the current page and are not submitted to ABS. If a contact email is configured and you choose Open email draft, your email application receives the draft. You decide whether to send it.",
      },
      {
        heading: "Hosting and technical data",
        text: "The hosting provider may process technical request information, including IP addresses and server logs. The production notice must identify the controller, processors, purposes, lawful bases, retention periods, transfers, rights and contact details.",
      },
      {
        heading: "Before launch",
        text: "Replace this placeholder with a reviewed privacy notice reflecting the actual business and deployed services. Add the verified data protection contact and relevant complaint route. Reassess before introducing a live enquiry service or analytics.",
      },
    ],
  },
  cookies: {
    title: "Cookies",
    description: "Placeholder cookie information for this demonstration.",
    sections: [
      {
        heading: "This site",
        text: "The application does not intentionally set analytics, advertising or preference cookies, or store enquiry details in local storage. Hosting and preview tools may behave separately; audit the deployed site before launch.",
      },
      {
        heading: "Before adding tracking",
        text: "Document each storage technology, its purpose, provider and duration. Assess consent requirements and implement appropriate controls before loading non-essential tracking. A decorative consent banner is not included.",
      },
    ],
  },
  terms: {
    title: "Website terms",
    description: "Placeholder terms for the ABS Properties website.",
    sections: [
      {
        heading: "Demonstration content",
        text: "All property listings, prices, availability, images, energy ratings, council tax bands and other property details are fictional examples. They are not an offer to let. No booking, valuation or agency instruction can be completed through this demonstration.",
      },
      {
        heading: "Business information to confirm",
        text: "Insert the legal entity name, company number if applicable, registered office, trading address, verified contact details and VAT information where applicable. No registrations or credentials are asserted by this placeholder.",
      },
      {
        heading: "Review before use",
        text: "Publish professionally reviewed terms covering use of the website, accuracy of listings, intellectual property, liability and the appropriate governing jurisdiction. These notes are not final legal terms.",
      },
    ],
  },
  fees: {
    title: "Fees & client protection",
    description:
      "Placeholders for the verified fee schedule and client protection disclosures.",
    sections: [
      {
        heading: "Fees and deposits",
        text: "Landlord fees, applicable tenant payments and deposit arrangements have not been supplied. Publish a clear verified schedule, including VAT treatment and the scope of each service, before taking instructions or publishing real listings. Mock deposit figures are demonstration data only.",
      },
      {
        heading: "Client money protection",
        text: "Insert the verified scheme name, membership details and current certificate where applicable. This site does not claim that ABS is a member of any scheme.",
      },
      {
        heading: "Redress and registration",
        text: "Insert the verified redress scheme, membership number, complaint escalation details and any required registrations. Confirm the countries in which ABS operates: requirements vary across England, Wales, Scotland and Northern Ireland.",
      },
    ],
  },
  complaints: {
    title: "Complaints & redress",
    description: "Placeholder for a verified complaints process.",
    sections: [
      {
        heading: "How to raise a complaint",
        text: "The company complaint contact, postal address, response times and escalation process are awaiting confirmation. This demonstration is not a monitored complaints channel. Existing clients should use their contractual contact details.",
      },
      {
        heading: "Independent redress",
        text: "Publish the confirmed scheme name, membership details, contact link, eligibility and escalation timetable once verified. No scheme membership is implied.",
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    description: "Our approach to an accessible website.",
    sections: [
      {
        heading: "Built for more people",
        text: "The site uses semantic headings, labelled forms, visible keyboard focus, a skip link, reduced-motion support and responsive layouts. Property information is presented as text as well as images.",
      },
      {
        heading: "Continuing checks",
        text: "Full WCAG 2.2 AA conformance is not claimed. Before launch, test with keyboard navigation, screen readers, zoom, high contrast settings and assistive technology on common mobile and desktop browsers.",
      },
      {
        heading: "Contact and alternatives",
        text: "Add a verified contact channel for accessibility feedback and requests for alternative formats before launch.",
      },
    ],
  },
};
