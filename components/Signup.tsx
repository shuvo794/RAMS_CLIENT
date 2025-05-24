"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SIGNUP } from "@/lib/config";
import Swal from "sweetalert2";
import { useState } from "react";

type SignUpFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  primary_phone: string;
  country_code: string;
  rl_no: string;
  logo: FileList;
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
  marginBottom: "1rem",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#2563ea",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  marginBottom: "1rem",
  cursor: "pointer",
};

const countries = [
  { code: "AD", label: "Andorra", value: "+376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    value: "+971",
  },
  { code: "AF", label: "Afghanistan", value: "+93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    value: "+1-268",
  },
  { code: "AI", label: "Anguilla", value: "+1-264" },
  { code: "AL", label: "Albania", value: "+355" },
  { code: "AM", label: "Armenia", value: "+374" },
  { code: "AO", label: "Angola", value: "+244" },
  { code: "AQ", label: "Antarctica", value: "+672" },
  { code: "AR", label: "Argentina", value: "+54" },
  { code: "AS", label: "American Samoa", value: "+1-684" },
  { code: "AT", label: "Austria", value: "+43" },
  {
    code: "AU",
    label: "Australia",
    value: "+61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", value: "+297" },
  { code: "AX", label: "Alland Islands", value: "+358" },
  { code: "AZ", label: "Azerbaijan", value: "+994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    value: "+387",
  },
  { code: "BB", label: "Barbados", value: "+1-246" },
  { code: "BD", label: "Bangladesh", value: "+880" },
  { code: "BE", label: "Belgium", value: "+32" },
  { code: "BF", label: "Burkina Faso", value: "+226" },
  { code: "BG", label: "Bulgaria", value: "+359" },
  { code: "BH", label: "Bahrain", value: "+973" },
  { code: "BI", label: "Burundi", value: "+257" },
  { code: "BJ", label: "Benin", value: "+229" },
  { code: "BL", label: "Saint Barthelemy", value: "+590" },
  { code: "BM", label: "Bermuda", value: "+1-441" },
  { code: "BN", label: "Brunei Darussalam", value: "+673" },
  { code: "BO", label: "Bolivia", value: "+591" },
  { code: "BR", label: "Brazil", value: "+55" },
  { code: "BS", label: "Bahamas", value: "+1-242" },
  { code: "BT", label: "Bhutan", value: "+975" },
  { code: "BV", label: "Bouvet Island", value: "+47" },
  { code: "BW", label: "Botswana", value: "+267" },
  { code: "BY", label: "Belarus", value: "+375" },
  { code: "BZ", label: "Belize", value: "+501" },
  {
    code: "CA",
    label: "Canada",
    value: "+1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    value: "+61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    value: "+243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    value: "+236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    value: "+242",
  },
  { code: "CH", label: "Switzerland", value: "+41" },
  { code: "CI", label: "Cote d'Ivoire", value: "+225" },
  { code: "CK", label: "Cook Islands", value: "+682" },
  { code: "CL", label: "Chile", value: "+56" },
  { code: "CM", label: "Cameroon", value: "+237" },
  { code: "CN", label: "China", value: "+86" },
  { code: "CO", label: "Colombia", value: "+57" },
  { code: "CR", label: "Costa Rica", value: "+506" },
  { code: "CU", label: "Cuba", value: "+53" },
  { code: "CV", label: "Cape Verde", value: "+238" },
  { code: "CW", label: "Curacao", value: "+599" },
  { code: "CX", label: "Christmas Island", value: "+61" },
  { code: "CY", label: "Cyprus", value: "+357" },
  { code: "CZ", label: "Czech Republic", value: "+420" },
  {
    code: "DE",
    label: "Germany",
    value: "+49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", value: "+253" },
  { code: "DK", label: "Denmark", value: "+45" },
  { code: "DM", label: "Dominica", value: "+1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    value: "+1-809",
  },
  { code: "DZ", label: "Algeria", value: "+213" },
  { code: "EC", label: "Ecuador", value: "+593" },
  { code: "EE", label: "Estonia", value: "+372" },
  { code: "EG", label: "Egypt", value: "+20" },
  { code: "EH", label: "Western Sahara", value: "+212" },
  { code: "ER", label: "Eritrea", value: "+291" },
  { code: "ES", label: "Spain", value: "+34" },
  { code: "ET", label: "Ethiopia", value: "+251" },
  { code: "FI", label: "Finland", value: "+358" },
  { code: "FJ", label: "Fiji", value: "+679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    value: "+500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    value: "+691",
  },
  { code: "FO", label: "Faroe Islands", value: "+298" },
  {
    code: "FR",
    label: "France",
    value: "+33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", value: "+241" },
  { code: "GB", label: "United Kingdom", value: "+44" },
  { code: "GD", label: "Grenada", value: "+1-473" },
  { code: "GE", label: "Georgia", value: "+995" },
  { code: "GF", label: "French Guiana", value: "+594" },
  { code: "GG", label: "Guernsey", value: "+44" },
  { code: "GH", label: "Ghana", value: "+233" },
  { code: "GI", label: "Gibraltar", value: "+350" },
  { code: "GL", label: "Greenland", value: "+299" },
  { code: "GM", label: "Gambia", value: "+220" },
  { code: "GN", label: "Guinea", value: "+224" },
  { code: "GP", label: "Guadeloupe", value: "+590" },
  { code: "GQ", label: "Equatorial Guinea", value: "+240" },
  { code: "GR", label: "Greece", value: "+30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    value: "+500",
  },
  { code: "GT", label: "Guatemala", value: "+502" },
  { code: "GU", label: "Guam", value: "+1-671" },
  { code: "GW", label: "Guinea-Bissau", value: "+245" },
  { code: "GY", label: "Guyana", value: "+592" },
  { code: "HK", label: "Hong Kong", value: "+852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    value: "+672",
  },
  { code: "HN", label: "Honduras", value: "+504" },
  { code: "HR", label: "Croatia", value: "+385" },
  { code: "HT", label: "Haiti", value: "+509" },
  { code: "HU", label: "Hungary", value: "+36" },
  { code: "ID", label: "Indonesia", value: "+62" },
  { code: "IE", label: "Ireland", value: "+353" },
  { code: "IL", label: "Israel", value: "+972" },
  { code: "IM", label: "Isle of Man", value: "+44" },
  { code: "IN", label: "India", value: "+91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    value: "+246",
  },
  { code: "IQ", label: "Iraq", value: "+964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    value: "+98",
  },
  { code: "IS", label: "Iceland", value: "+354" },
  { code: "IT", label: "Italy", value: "+39" },
  { code: "JE", label: "Jersey", value: "+44" },
  { code: "JM", label: "Jamaica", value: "+1-876" },
  { code: "JO", label: "Jordan", value: "+962" },
  {
    code: "JP",
    label: "Japan",
    value: "+81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", value: "+254" },
  { code: "KG", label: "Kyrgyzstan", value: "+996" },
  { code: "KH", label: "Cambodia", value: "+855" },
  { code: "KI", label: "Kiribati", value: "+686" },
  { code: "KM", label: "Comoros", value: "+269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    value: "+1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    value: "+850",
  },
  { code: "KR", label: "Korea, Republic of", value: "+82" },
  { code: "KW", label: "Kuwait", value: "+965" },
  { code: "KY", label: "Cayman Islands", value: "+1-345" },
  { code: "KZ", label: "Kazakhstan", value: "+7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    value: "+856",
  },
  { code: "LB", label: "Lebanon", value: "+961" },
  { code: "LC", label: "Saint Lucia", value: "+1-758" },
  { code: "LI", label: "Liechtenstein", value: "+423" },
  { code: "LK", label: "Sri Lanka", value: "+94" },
  { code: "LR", label: "Liberia", value: "+231" },
  { code: "LS", label: "Lesotho", value: "+266" },
  { code: "LT", label: "Lithuania", value: "+370" },
  { code: "LU", label: "Luxembourg", value: "+352" },
  { code: "LV", label: "Latvia", value: "+371" },
  { code: "LY", label: "Libya", value: "+218" },
  { code: "MA", label: "Morocco", value: "+212" },
  { code: "MC", label: "Monaco", value: "+377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    value: "+373",
  },
  { code: "ME", label: "Montenegro", value: "+382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    value: "+590",
  },
  { code: "MG", label: "Madagascar", value: "+261" },
  { code: "MH", label: "Marshall Islands", value: "+692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    value: "+389",
  },
  { code: "ML", label: "Mali", value: "+223" },
  { code: "MM", label: "Myanmar", value: "+95" },
  { code: "MN", label: "Mongolia", value: "+976" },
  { code: "MO", label: "Macao", value: "+853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    value: "+1-670",
  },
  { code: "MQ", label: "Martinique", value: "+596" },
  { code: "MR", label: "Mauritania", value: "+222" },
  { code: "MS", label: "Montserrat", value: "+1-664" },
  { code: "MT", label: "Malta", value: "+356" },
  { code: "MU", label: "Mauritius", value: "+230" },
  { code: "MV", label: "Maldives", value: "+960" },
  { code: "MW", label: "Malawi", value: "+265" },
  { code: "MX", label: "Mexico", value: "+52" },
  { code: "MY", label: "Malaysia", value: "+60" },
  { code: "MZ", label: "Mozambique", value: "+258" },
  { code: "NA", label: "Namibia", value: "+264" },
  { code: "NC", label: "New Caledonia", value: "+687" },
  { code: "NE", label: "Niger", value: "+227" },
  { code: "NF", label: "Norfolk Island", value: "+672" },
  { code: "NG", label: "Nigeria", value: "+234" },
  { code: "NI", label: "Nicaragua", value: "+505" },
  { code: "NL", label: "Netherlands", value: "+31" },
  { code: "NO", label: "Norway", value: "+47" },
  { code: "NP", label: "Nepal", value: "+977" },
  { code: "NR", label: "Nauru", value: "+674" },
  { code: "NU", label: "Niue", value: "+683" },
  { code: "NZ", label: "New Zealand", value: "+64" },
  { code: "OM", label: "Oman", value: "+968" },
  { code: "PA", label: "Panama", value: "+507" },
  { code: "PE", label: "Peru", value: "+51" },
  { code: "PF", label: "French Polynesia", value: "+689" },
  { code: "PG", label: "Papua New Guinea", value: "+675" },
  { code: "PH", label: "Philippines", value: "+63" },
  { code: "PK", label: "Pakistan", value: "+92" },
  { code: "PL", label: "Poland", value: "+48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    value: "+508",
  },
  { code: "PN", label: "Pitcairn", value: "+870" },
  { code: "PR", label: "Puerto Rico", value: "+1" },
  {
    code: "PS",
    label: "Palestine, State of",
    value: "+970",
  },
  { code: "PT", label: "Portugal", value: "+351" },
  { code: "PW", label: "Palau", value: "+680" },
  { code: "PY", label: "Paraguay", value: "+595" },
  { code: "QA", label: "Qatar", value: "+974" },
  { code: "RE", label: "Reunion", value: "+262" },
  { code: "RO", label: "Romania", value: "+40" },
  { code: "RS", label: "Serbia", value: "+381" },
  { code: "RU", label: "Russian Federation", value: "+7" },
  { code: "RW", label: "Rwanda", value: "+250" },
  { code: "SA", label: "Saudi Arabia", value: "+966" },
  { code: "SB", label: "Solomon Islands", value: "+677" },
  { code: "SC", label: "Seychelles", value: "+248" },
  { code: "SD", label: "Sudan", value: "+249" },
  { code: "SE", label: "Sweden", value: "+46" },
  { code: "SG", label: "Singapore", value: "+65" },
  { code: "SH", label: "Saint Helena", value: "+290" },
  { code: "SI", label: "Slovenia", value: "+386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    value: "+47",
  },
  { code: "SK", label: "Slovakia", value: "+421" },
  { code: "SL", label: "Sierra Leone", value: "+232" },
  { code: "SM", label: "San Marino", value: "+378" },
  { code: "SN", label: "Senegal", value: "+221" },
  { code: "SO", label: "Somalia", value: "+252" },
  { code: "SR", label: "Suriname", value: "+597" },
  { code: "SS", label: "South Sudan", value: "+211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    value: "+239",
  },
  { code: "SV", label: "El Salvador", value: "+503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    value: "+1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    value: "+963",
  },
  { code: "SZ", label: "Swaziland", value: "+268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    value: "+1-649",
  },
  { code: "TD", label: "Chad", value: "+235" },
  {
    code: "TF",
    label: "French Southern Territories",
    value: "+262",
  },
  { code: "TG", label: "Togo", value: "+228" },
  { code: "TH", label: "Thailand", value: "+66" },
  { code: "TJ", label: "Tajikistan", value: "+992" },
  { code: "TK", label: "Tokelau", value: "+690" },
  { code: "TL", label: "Timor-Leste", value: "+670" },
  { code: "TM", label: "Turkmenistan", value: "+993" },
  { code: "TN", label: "Tunisia", value: "+216" },
  { code: "TO", label: "Tonga", value: "+676" },
  { code: "TR", label: "Turkey", value: "+90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    value: "+1-868",
  },
  { code: "TV", label: "Tuvalu", value: "+688" },
  {
    code: "TW",
    label: "Taiwan, Province of China",
    value: "+886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    value: "+255",
  },
  { code: "UA", label: "Ukraine", value: "+380" },
  { code: "UG", label: "Uganda", value: "+256" },
  {
    code: "US",
    label: "United States",
    value: "+1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", value: "+598" },
  { code: "UZ", label: "Uzbekistan", value: "+998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    value: "+379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    value: "+1-784",
  },
  { code: "VE", label: "Venezuela", value: "+58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    value: "+1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    value: "+1-340",
  },
  { code: "VN", label: "Vietnam", value: "+84" },
  { code: "VU", label: "Vanuatu", value: "+678" },
  { code: "WF", label: "Wallis and Futuna", value: "+681" },
  { code: "WS", label: "Samoa", value: "+685" },
  { code: "XK", label: "Kosovo", value: "+383" },
  { code: "YE", label: "Yemen", value: "+967" },
  { code: "YT", label: "Mayotte", value: "+262" },
  { code: "ZA", label: "South Africa", value: "+27" },
  { code: "ZM", label: "Zambia", value: "+260" },
  { code: "ZW", label: "Zimbabwe", value: "+263" },
];

// interface Country {
//   label: string;
//   value: string;
// }

export default function CreatPage() {
  const router = useRouter();
  const [selectedCode, setSelectedCode] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<SignUpFormInputs>();

  const onSubmit = async (data: SignUpFormInputs) => {
    const formData = new FormData();

    // Append all form fields
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("primary_phone", data.primary_phone);
    formData.append("country_code", data.country_code);
    formData.append("rl_no", data.rl_no);

    // Append logo file
    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    try {
      const response = await fetch(SIGNUP, {
        method: "POST",
        body: formData, // No headers, browser sets Content-Type automatically
      });

      if (!response.ok) {
        // const errorData = await response.json();
        // console.error("API validation errors:", errorData);
        return;
      }

      const result = await response.json();

      console.log("Signup successful", result);

      if (result.client) {
        localStorage.setItem("userName", result.client);
        console.log("Token stored:", localStorage.getItem("token"));
      }

      if (result.client.first_name) {
        localStorage.setItem("userName", result.client.first_name);
      }

      Swal.fire({
        title: "Sign Up Successful!",
        icon: "success",
        showConfirmButton: false, // 🔵 No confirm button
        timer: 2000, // Optional: auto close after 2 seconds
        // didOpen: () => {
        //   const title = Swal.getTitle();
        //   if (title) {
        //     title.style.color = "#2563ea"; // 🔵 Set title color to blue
        //   }
        // },
      }).then(() => {
        router.push("/");
      });
    } catch {
      // console.error("Signup error:", error);
    }
  };

  interface Country {
    code: string;
    label: string;
    value: string;
    suggested?: boolean;
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: Country | undefined = countries.find(
      (c: Country) => c.label === e.target.value
    );

    if (selected) {
      setSelectedCode(selected.value);
      setValue("country_code", selected.value); // update the input field
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#2563ea",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        SIGN UP
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        {/* logo Upload */}
        <label style={{ marginBottom: "0.5rem", display: "block" }}>
          Upload logo
        </label>
        <input type="file" {...register("logo")} style={inputStyle} />

        {/* First Name & Last Name in one line */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Enter First Name"
            {...register("first_name", { required: true })}
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            {...register("last_name", { required: true })}
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {/* Country Select */}
          <div style={{ flex: "1" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.3rem",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Country
            </label>
            <select
              onChange={handleCountryChange}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.code} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Country Code */}
          <div style={{ flex: "0 0 100px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.3rem",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Country Code
            </label>
            <input
              type="text"
              placeholder="+880"
              {...register("country_code", { required: true })}
              value={selectedCode}
              readOnly
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
              }}
            />
          </div>

          {/* Primary Phone */}
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.3rem",
                fontSize: "0.8rem",
                color: "#666",
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter Phone"
              {...register("primary_phone", { required: true })}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {/* RL Number */}
        <input
          type="text"
          placeholder="Enter RL Number"
          {...register("rl_no", { required: true })}
          style={inputStyle}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          {...register("password", { required: true })}
          style={inputStyle}
        />

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>
          SIGN UP
        </button>

        {/* Sign In Redirect */}
        <button
          type="button"
          onClick={() => router.push("/Signin")}
          style={buttonStyle}
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}
