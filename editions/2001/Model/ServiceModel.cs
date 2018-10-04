using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace AltinnCoreServiceImplementation.matsgm.dotnet01_2001
{
public class Skjema{
[Range(Int32.MinValue,Int32.MaxValue)]
    [XmlAttribute("skjemanummer")]
    [BindNever]
public decimal skjemanummer {get; set;} = 1243;
[Range(Int32.MinValue,Int32.MaxValue)]
    [XmlAttribute("spesifikasjonsnummer")]
    [BindNever]
public decimal spesifikasjonsnummer {get; set;} = 10702;
    [XmlAttribute("blankettnummer")]
    [BindNever]
public  string blankettnummer {get; set; } = "RF-1117";
    [XmlAttribute("tittel")]
    [BindNever]
public  string tittel {get; set; } = "Klage p� likningen";
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5800;
    [XmlAttribute("etatid")]
public string etatid { get; set; }
    [XmlElement("Skattyterinfor-grp-5801")]
public Skattyterinfor Skattyterinfor { get; set; }
    [XmlElement("klage-grp-5805")]
public klage klage { get; set; }
}
public class klage{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5805;
    [XmlElement("spesifisering-grp-5836")]
public spesifisering spesifisering { get; set; }
}
public class spesifisering{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5836;
    [XmlElement("KlageSpesifisering-datadef-25457")]
public KlageSpesifisering KlageSpesifisering { get; set; }
}
public class KlageSpesifisering{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25457;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string Value { get; set; }
}
public class Skattyterinfor{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5801;
    [XmlElement("info-grp-5802")]
public info info { get; set; }
    [XmlElement("Kontakt-grp-5803")]
public Kontakt Kontakt { get; set; }
    [XmlElement("klagefrist-grp-5804")]
public klagefrist klagefrist { get; set; }
}
public class klagefrist{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5804;
    [XmlElement("KlageGjeldendeInntektsar-datadef-25455")]
public KlageGjeldendeInntektsar KlageGjeldendeInntektsar { get; set; }
    [XmlElement("KlagemeldingSendtInnenKlagefrist-datadef-25454")]
public KlagemeldingSendtInnenKlagefrist KlagemeldingSendtInnenKlagefrist { get; set; }
    [XmlElement("KlageUtloptKlagefristBegrunnelse-datadef-25456")]
public KlageUtloptKlagefristBegrunnelse KlageUtloptKlagefristBegrunnelse { get; set; }
}
public class KlageUtloptKlagefristBegrunnelse{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25456;
[MinLength(1)]
[MaxLength(1000)]
    [XmlText()]
public string Value { get; set; }
}
public class KlagemeldingSendtInnenKlagefrist{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25454;
[MinLength(1)]
[MaxLength(3)]
    [XmlText()]
public string Value { get; set; }
}
public class KlageGjeldendeInntektsar{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25455;
    [XmlText()]
public DateTime Value { get; set; }
}
public class Kontakt{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5803;
    [XmlElement("KontaktpersonNavn-datadef-2")]
public KontaktpersonNavn KontaktpersonNavn { get; set; }
    [XmlElement("KontaktpersonAdresse-datadef-2751")]
public KontaktpersonAdresse KontaktpersonAdresse { get; set; }
    [XmlElement("KontaktpersonPostnummer-datadef-10441")]
public KontaktpersonPostnummer KontaktpersonPostnummer { get; set; }
    [XmlElement("KontaktpersonPoststed-datadef-10442")]
public KontaktpersonPoststed KontaktpersonPoststed { get; set; }
    [XmlElement("KontaktpersonEPost-datadef-27688")]
public KontaktpersonEPost KontaktpersonEPost { get; set; }
    [XmlElement("KontaktpersonTelefonnummer-datadef-3")]
public KontaktpersonTelefonnummer KontaktpersonTelefonnummer { get; set; }
}
public class KontaktpersonTelefonnummer{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 3;
[MinLength(1)]
[MaxLength(13)]
    [XmlText()]
public string Value { get; set; }
}
public class KontaktpersonEPost{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 27688;
[MinLength(1)]
[MaxLength(45)]
    [XmlText()]
public string Value { get; set; }
}
public class KontaktpersonPoststed{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 10442;
[MinLength(1)]
[MaxLength(35)]
    [XmlText()]
public string Value { get; set; }
}
public class KontaktpersonPostnummer{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 10441;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string Value { get; set; }
}
public class KontaktpersonAdresse{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 2751;
[MinLength(1)]
[MaxLength(105)]
    [XmlText()]
public string Value { get; set; }
}
public class KontaktpersonNavn{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 2;
[MinLength(1)]
[MaxLength(150)]
    [XmlText()]
public string Value { get; set; }
}
public class info{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("gruppeid")]
    [BindNever]
public decimal gruppeid {get; set;} = 5802;
    [XmlElement("OppgavegiverNavnPreutfylt-datadef-25795")]
public OppgavegiverNavnPreutfylt OppgavegiverNavnPreutfylt { get; set; }
    [XmlElement("OppgavegiverAdressePreutfylt-datadef-25796")]
public OppgavegiverAdressePreutfylt OppgavegiverAdressePreutfylt { get; set; }
    [XmlElement("OppgavegiverPostnummerPreutfylt-datadef-25797")]
public OppgavegiverPostnummerPreutfylt OppgavegiverPostnummerPreutfylt { get; set; }
    [XmlElement("OppgavegiverPoststedPreutfylt-datadef-25798")]
public OppgavegiverPoststedPreutfylt OppgavegiverPoststedPreutfylt { get; set; }
    [XmlElement("OppgavegiverFodselsnummer-datadef-26")]
public OppgavegiverFodselsnummer OppgavegiverFodselsnummer { get; set; }
    [XmlElement("EnhetOrganisasjonsnummer-datadef-18")]
public EnhetOrganisasjonsnummer EnhetOrganisasjonsnummer { get; set; }
    [XmlElement("EnhetKommunenummer-datadef-17")]
public EnhetKommunenummer EnhetKommunenummer { get; set; }
}
public class EnhetKommunenummer{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 17;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string Value { get; set; }
}
public class EnhetOrganisasjonsnummer{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 18;
    [XmlText()]
public string Value { get; set; }
}
public class OppgavegiverFodselsnummer{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 26;
    [XmlText()]
public string Value { get; set; }
}
public class OppgavegiverPoststedPreutfylt{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25798;
[MinLength(1)]
[MaxLength(35)]
    [XmlText()]
public string Value { get; set; }
}
public class OppgavegiverPostnummerPreutfylt{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25797;
[RegularExpression(@"[0-9]{4}")]
    [XmlText()]
public string Value { get; set; }
}
public class OppgavegiverAdressePreutfylt{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25796;
[MinLength(1)]
[MaxLength(500)]
    [XmlText()]
public string Value { get; set; }
}
public class OppgavegiverNavnPreutfylt{
[Range(1,Int32.MaxValue)]
    [XmlAttribute("orid")]
    [BindNever]
public decimal orid {get; set;} = 25795;
[MinLength(1)]
[MaxLength(175)]
    [XmlText()]
public string Value { get; set; }
}
}
