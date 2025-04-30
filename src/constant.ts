export const ROLE_ADMIN = 'Admin';
export const ROLE_HRD = 'Hrd';
export const ROLE_VENDOR = 'Vendor';
export const ROLE_EMPLOYEE = 'Employee';

export const CREATE_USER = 'create_user';
export const EDIT_USER = 'edit_user';
export const INDEX_USER = 'index_user';
export const FIND_USER = 'find_user';
export const REMOVE_USER = 'remove_user';

export const CREATE_ROLE = 'create_role';
export const EDIT_ROLE = 'edit_role';
export const INDEX_ROLE = 'index_role';
export const FIND_ROLE = 'find_role';
export const REMOVE_ROLE = 'remove_role';

export const CREATE_VENDOR = 'create_vendor';
export const EDIT_VENDOR = 'edit_vendor';
export const INDEX_VENDOR = 'index_vendor';
export const FIND_VENDOR = 'find_vendor';
export const REMOVE_VENDOR = 'remove_vendor';

export const CREATE_TASK = 'create_task';
export const EDIT_TASK = 'edit_task';
export const INDEX_TASK = 'index_task';
export const FIND_TASK = 'find_task';
export const REMOVE_TASK = 'remove_task';

export const CREATE_EMPLOYEE = 'create_employee';
export const EDIT_EMPLOYEE = 'edit_employee';
export const INDEX_EMPLOYEE = 'index_employee';
export const FIND_EMPLOYEE = 'find_employee';
export const REMOVE_EMPLOYEE = 'remove_employee';

export const CREATE_CONTRACT = 'create_contract';
export const EDIT_CONTRACT = 'edit_contract';
export const INDEX_CONTRACT = 'index_contract';
export const FIND_CONTRACT = 'find_contract';
export const REMOVE_CONTRACT = 'remove_contract';

export const CREATE_TIMESHEET = 'create_timesheet';
export const EDIT_TIMESHEET = 'edit_timesheet';
export const INDEX_TIMESHEET = 'index_timesheet';
export const FIND_TIMESHEET = 'find_timesheet';
export const REMOVE_TIMESHEET = 'remove_timesheet';
export const MANAGE_TIMESHEET = 'manage_timesheet';
export const INTERNAL_MEMO_TIMESHEET = 'internal_memo_timesheet';
export const EXTERNAL_MEMO_TIMESHEET = 'external_memo_timesheet';

export const CREATE_INVOICE = 'create_invoice';
export const EDIT_INVOICE = 'edit_invoice';
export const INDEX_INVOICE = 'index_invoice';
export const FIND_INVOICE = 'find_invoice';
export const REMOVE_INVOICE = 'remove_invoice';

export const CREATE_TIME_OFF = 'create_time_off';
export const EDIT_TIME_OFF = 'edit_time_off';
export const INDEX_TIME_OFF = 'index_time_off';
export const FIND_TIME_OFF = 'find_time_off';
export const REMOVE_TIME_OFF = 'remove_time_off';
export const MANAGE_TIME_OFF = 'manage_time_off';

export const USER_PERMISSION_GROUPS = [CREATE_USER, EDIT_USER, INDEX_USER, FIND_USER, REMOVE_ROLE];

export const ROLE_PERMISSION_GROUPS = [CREATE_ROLE, EDIT_ROLE, INDEX_ROLE, FIND_ROLE, REMOVE_ROLE];

export const VENDOR_PERMISSION_GROUPS = [CREATE_VENDOR, EDIT_VENDOR, INDEX_VENDOR, FIND_VENDOR, REMOVE_VENDOR];

export const TASK_PERMISSION_GROUPS = [CREATE_TASK, EDIT_TASK, INDEX_TASK, FIND_TASK, REMOVE_TASK];

export const EMPLOYEE_PERMISSION_GROUPS = [
  CREATE_EMPLOYEE,
  EDIT_EMPLOYEE,
  INDEX_EMPLOYEE,
  FIND_EMPLOYEE,
  REMOVE_EMPLOYEE
];

export const CONTRACT_PERMISSION_GROUPS = [
  CREATE_CONTRACT,
  EDIT_CONTRACT,
  INDEX_CONTRACT,
  FIND_CONTRACT,
  REMOVE_CONTRACT
];

export const TIMESHEET_PERMISSION_GROUPS = [
  CREATE_TIMESHEET,
  EDIT_TIMESHEET,
  INDEX_TIMESHEET,
  FIND_TIMESHEET,
  REMOVE_TIMESHEET
];

export const INVOICE_PERMISSION_GROUPS = [CREATE_INVOICE, EDIT_INVOICE, INDEX_INVOICE, FIND_INVOICE, REMOVE_INVOICE];

export const TIME_OFF_PERMISSION_GROUPS = [
  CREATE_TIME_OFF,
  EDIT_TIME_OFF,
  INDEX_TIME_OFF,
  FIND_TIME_OFF,
  REMOVE_TIME_OFF
];

export const ADMIN_HAS_PERMISSIONS = [
  ...USER_PERMISSION_GROUPS,
  ...ROLE_PERMISSION_GROUPS,
  ...VENDOR_PERMISSION_GROUPS,
  INDEX_CONTRACT
];

export const HRD_HAS_PERMISSIONS = [
  ...USER_PERMISSION_GROUPS,
  ...ROLE_PERMISSION_GROUPS,
  ...VENDOR_PERMISSION_GROUPS,
  ...CONTRACT_PERMISSION_GROUPS,
  ...EMPLOYEE_PERMISSION_GROUPS,
  INDEX_TIMESHEET,
  INTERNAL_MEMO_TIMESHEET,
  FIND_TIMESHEET,
  CREATE_INVOICE,
  EDIT_INVOICE,
  REMOVE_INVOICE,
  INDEX_TIME_OFF,
  FIND_TIME_OFF,
  EDIT_TIME_OFF
];

export const VENDOR_HAS_PERMISSIONS = [
  INDEX_USER,
  INDEX_CONTRACT,
  FIND_VENDOR,
  INDEX_TIMESHEET,
  MANAGE_TIMESHEET,
  EXTERNAL_MEMO_TIMESHEET,
  FIND_TIMESHEET,
  EDIT_INVOICE,
  INDEX_TIME_OFF,
  FIND_TIME_OFF,
  EDIT_TIME_OFF,
  ...TASK_PERMISSION_GROUPS
];

export const EMPLOYEE_HAS_PERMISSIONS = [
  FIND_VENDOR,
  ...TIMESHEET_PERMISSION_GROUPS,
  ...TIME_OFF_PERMISSION_GROUPS,
  INDEX_TASK
];

export const COUNTRIES = [
  {
    name: 'Afghanistan',
    dialCode: '+93',
    code: 'AF'
  },
  {
    name: 'Aland Islands',
    dialCode: '+358',
    code: 'AX'
  },
  {
    name: 'Albania',
    dialCode: '+355',
    code: 'AL'
  },
  {
    name: 'Algeria',
    dialCode: '+213',
    code: 'DZ'
  },
  {
    name: 'AmericanSamoa',
    dialCode: '+1684',
    code: 'AS'
  },
  {
    name: 'Andorra',
    dialCode: '+376',
    code: 'AD'
  },
  {
    name: 'Angola',
    dialCode: '+244',
    code: 'AO'
  },
  {
    name: 'Anguilla',
    dialCode: '+1264',
    code: 'AI'
  },
  {
    name: 'Antarctica',
    dialCode: '+672',
    code: 'AQ'
  },
  {
    name: 'Antigua and Barbuda',
    dialCode: '+1268',
    code: 'AG'
  },
  {
    name: 'Argentina',
    dialCode: '+54',
    code: 'AR'
  },
  {
    name: 'Armenia',
    dialCode: '+374',
    code: 'AM'
  },
  {
    name: 'Aruba',
    dialCode: '+297',
    code: 'AW'
  },
  {
    name: 'Australia',
    dialCode: '+61',
    code: 'AU'
  },
  {
    name: 'Austria',
    dialCode: '+43',
    code: 'AT'
  },
  {
    name: 'Azerbaijan',
    dialCode: '+994',
    code: 'AZ'
  },
  {
    name: 'Bahamas',
    dialCode: '+1242',
    code: 'BS'
  },
  {
    name: 'Bahrain',
    dialCode: '+973',
    code: 'BH'
  },
  {
    name: 'Bangladesh',
    dialCode: '+880',
    code: 'BD'
  },
  {
    name: 'Barbados',
    dialCode: '+1246',
    code: 'BB'
  },
  {
    name: 'Belarus',
    dialCode: '+375',
    code: 'BY'
  },
  {
    name: 'Belgium',
    dialCode: '+32',
    code: 'BE'
  },
  {
    name: 'Belize',
    dialCode: '+501',
    code: 'BZ'
  },
  {
    name: 'Benin',
    dialCode: '+229',
    code: 'BJ'
  },
  {
    name: 'Bermuda',
    dialCode: '+1441',
    code: 'BM'
  },
  {
    name: 'Bhutan',
    dialCode: '+975',
    code: 'BT'
  },
  {
    name: 'Bolivia, Plurinational State of',
    dialCode: '+591',
    code: 'BO'
  },
  {
    name: 'Bosnia and Herzegovina',
    dialCode: '+387',
    code: 'BA'
  },
  {
    name: 'Botswana',
    dialCode: '+267',
    code: 'BW'
  },
  {
    name: 'Brazil',
    dialCode: '+55',
    code: 'BR'
  },
  {
    name: 'British Indian Ocean Territory',
    dialCode: '+246',
    code: 'IO'
  },
  {
    name: 'Brunei Darussalam',
    dialCode: '+673',
    code: 'BN'
  },
  {
    name: 'Bulgaria',
    dialCode: '+359',
    code: 'BG'
  },
  {
    name: 'Burkina Faso',
    dialCode: '+226',
    code: 'BF'
  },
  {
    name: 'Burundi',
    dialCode: '+257',
    code: 'BI'
  },
  {
    name: 'Cambodia',
    dialCode: '+855',
    code: 'KH'
  },
  {
    name: 'Cameroon',
    dialCode: '+237',
    code: 'CM'
  },
  {
    name: 'Canada',
    dialCode: '+1',
    code: 'CA'
  },
  {
    name: 'Cape Verde',
    dialCode: '+238',
    code: 'CV'
  },
  {
    name: 'Cayman Islands',
    dialCode: '+ 345',
    code: 'KY'
  },
  {
    name: 'Central African Republic',
    dialCode: '+236',
    code: 'CF'
  },
  {
    name: 'Chad',
    dialCode: '+235',
    code: 'TD'
  },
  {
    name: 'Chile',
    dialCode: '+56',
    code: 'CL'
  },
  {
    name: 'China',
    dialCode: '+86',
    code: 'CN'
  },
  {
    name: 'Christmas Island',
    dialCode: '+61',
    code: 'CX'
  },
  {
    name: 'Cocos (Keeling) Islands',
    dialCode: '+61',
    code: 'CC'
  },
  {
    name: 'Colombia',
    dialCode: '+57',
    code: 'CO'
  },
  {
    name: 'Comoros',
    dialCode: '+269',
    code: 'KM'
  },
  {
    name: 'Congo',
    dialCode: '+242',
    code: 'CG'
  },
  {
    name: 'Congo, The Democratic Republic of the Congo',
    dialCode: '+243',
    code: 'CD'
  },
  {
    name: 'Cook Islands',
    dialCode: '+682',
    code: 'CK'
  },
  {
    name: 'Costa Rica',
    dialCode: '+506',
    code: 'CR'
  },
  {
    name: "Cote d'Ivoire",
    dialCode: '+225',
    code: 'CI'
  },
  {
    name: 'Croatia',
    dialCode: '+385',
    code: 'HR'
  },
  {
    name: 'Cuba',
    dialCode: '+53',
    code: 'CU'
  },
  {
    name: 'Cyprus',
    dialCode: '+357',
    code: 'CY'
  },
  {
    name: 'Czech Republic',
    dialCode: '+420',
    code: 'CZ'
  },
  {
    name: 'Denmark',
    dialCode: '+45',
    code: 'DK'
  },
  {
    name: 'Djibouti',
    dialCode: '+253',
    code: 'DJ'
  },
  {
    name: 'Dominica',
    dialCode: '+1767',
    code: 'DM'
  },
  {
    name: 'Dominican Republic',
    dialCode: '+1849',
    code: 'DO'
  },
  {
    name: 'Ecuador',
    dialCode: '+593',
    code: 'EC'
  },
  {
    name: 'Egypt',
    dialCode: '+20',
    code: 'EG'
  },
  {
    name: 'El Salvador',
    dialCode: '+503',
    code: 'SV'
  },
  {
    name: 'Equatorial Guinea',
    dialCode: '+240',
    code: 'GQ'
  },
  {
    name: 'Eritrea',
    dialCode: '+291',
    code: 'ER'
  },
  {
    name: 'Estonia',
    dialCode: '+372',
    code: 'EE'
  },
  {
    name: 'Ethiopia',
    dialCode: '+251',
    code: 'ET'
  },
  {
    name: 'Falkland Islands (Malvinas)',
    dialCode: '+500',
    code: 'FK'
  },
  {
    name: 'Faroe Islands',
    dialCode: '+298',
    code: 'FO'
  },
  {
    name: 'Fiji',
    dialCode: '+679',
    code: 'FJ'
  },
  {
    name: 'Finland',
    dialCode: '+358',
    code: 'FI'
  },
  {
    name: 'France',
    dialCode: '+33',
    code: 'FR'
  },
  {
    name: 'French Guiana',
    dialCode: '+594',
    code: 'GF'
  },
  {
    name: 'French Polynesia',
    dialCode: '+689',
    code: 'PF'
  },
  {
    name: 'Gabon',
    dialCode: '+241',
    code: 'GA'
  },
  {
    name: 'Gambia',
    dialCode: '+220',
    code: 'GM'
  },
  {
    name: 'Georgia',
    dialCode: '+995',
    code: 'GE'
  },
  {
    name: 'Germany',
    dialCode: '+49',
    code: 'DE'
  },
  {
    name: 'Ghana',
    dialCode: '+233',
    code: 'GH'
  },
  {
    name: 'Gibraltar',
    dialCode: '+350',
    code: 'GI'
  },
  {
    name: 'Greece',
    dialCode: '+30',
    code: 'GR'
  },
  {
    name: 'Greenland',
    dialCode: '+299',
    code: 'GL'
  },
  {
    name: 'Grenada',
    dialCode: '+1473',
    code: 'GD'
  },
  {
    name: 'Guadeloupe',
    dialCode: '+590',
    code: 'GP'
  },
  {
    name: 'Guam',
    dialCode: '+1671',
    code: 'GU'
  },
  {
    name: 'Guatemala',
    dialCode: '+502',
    code: 'GT'
  },
  {
    name: 'Guernsey',
    dialCode: '+44',
    code: 'GG'
  },
  {
    name: 'Guinea',
    dialCode: '+224',
    code: 'GN'
  },
  {
    name: 'Guinea-Bissau',
    dialCode: '+245',
    code: 'GW'
  },
  {
    name: 'Guyana',
    dialCode: '+595',
    code: 'GY'
  },
  {
    name: 'Haiti',
    dialCode: '+509',
    code: 'HT'
  },
  {
    name: 'Holy See (Vatican City State)',
    dialCode: '+379',
    code: 'VA'
  },
  {
    name: 'Honduras',
    dialCode: '+504',
    code: 'HN'
  },
  {
    name: 'Hong Kong',
    dialCode: '+852',
    code: 'HK'
  },
  {
    name: 'Hungary',
    dialCode: '+36',
    code: 'HU'
  },
  {
    name: 'Iceland',
    dialCode: '+354',
    code: 'IS'
  },
  {
    name: 'India',
    dialCode: '+91',
    code: 'IN'
  },
  {
    name: 'Indonesia',
    dialCode: '+62',
    code: 'ID'
  },
  {
    name: 'Iran, Islamic Republic of Persian Gulf',
    dialCode: '+98',
    code: 'IR'
  },
  {
    name: 'Iraq',
    dialCode: '+964',
    code: 'IQ'
  },
  {
    name: 'Ireland',
    dialCode: '+353',
    code: 'IE'
  },
  {
    name: 'Isle of Man',
    dialCode: '+44',
    code: 'IM'
  },
  {
    name: 'Israel',
    dialCode: '+972',
    code: 'IL'
  },
  {
    name: 'Italy',
    dialCode: '+39',
    code: 'IT'
  },
  {
    name: 'Jamaica',
    dialCode: '+1876',
    code: 'JM'
  },
  {
    name: 'Japan',
    dialCode: '+81',
    code: 'JP'
  },
  {
    name: 'Jersey',
    dialCode: '+44',
    code: 'JE'
  },
  {
    name: 'Jordan',
    dialCode: '+962',
    code: 'JO'
  },
  {
    name: 'Kazakhstan',
    dialCode: '+77',
    code: 'KZ'
  },
  {
    name: 'Kenya',
    dialCode: '+254',
    code: 'KE'
  },
  {
    name: 'Kiribati',
    dialCode: '+686',
    code: 'KI'
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    dialCode: '+850',
    code: 'KP'
  },
  {
    name: 'Korea, Republic of South Korea',
    dialCode: '+82',
    code: 'KR'
  },
  {
    name: 'Kuwait',
    dialCode: '+965',
    code: 'KW'
  },
  {
    name: 'Kyrgyzstan',
    dialCode: '+996',
    code: 'KG'
  },
  {
    name: 'Laos',
    dialCode: '+856',
    code: 'LA'
  },
  {
    name: 'Latvia',
    dialCode: '+371',
    code: 'LV'
  },
  {
    name: 'Lebanon',
    dialCode: '+961',
    code: 'LB'
  },
  {
    name: 'Lesotho',
    dialCode: '+266',
    code: 'LS'
  },
  {
    name: 'Liberia',
    dialCode: '+231',
    code: 'LR'
  },
  {
    name: 'Libyan Arab Jamahiriya',
    dialCode: '+218',
    code: 'LY'
  },
  {
    name: 'Liechtenstein',
    dialCode: '+423',
    code: 'LI'
  },
  {
    name: 'Lithuania',
    dialCode: '+370',
    code: 'LT'
  },
  {
    name: 'Luxembourg',
    dialCode: '+352',
    code: 'LU'
  },
  {
    name: 'Macao',
    dialCode: '+853',
    code: 'MO'
  },
  {
    name: 'Macedonia',
    dialCode: '+389',
    code: 'MK'
  },
  {
    name: 'Madagascar',
    dialCode: '+261',
    code: 'MG'
  },
  {
    name: 'Malawi',
    dialCode: '+265',
    code: 'MW'
  },
  {
    name: 'Malaysia',
    dialCode: '+60',
    code: 'MY'
  },
  {
    name: 'Maldives',
    dialCode: '+960',
    code: 'MV'
  },
  {
    name: 'Mali',
    dialCode: '+223',
    code: 'ML'
  },
  {
    name: 'Malta',
    dialCode: '+356',
    code: 'MT'
  },
  {
    name: 'Marshall Islands',
    dialCode: '+692',
    code: 'MH'
  },
  {
    name: 'Martinique',
    dialCode: '+596',
    code: 'MQ'
  },
  {
    name: 'Mauritania',
    dialCode: '+222',
    code: 'MR'
  },
  {
    name: 'Mauritius',
    dialCode: '+230',
    code: 'MU'
  },
  {
    name: 'Mayotte',
    dialCode: '+262',
    code: 'YT'
  },
  {
    name: 'Mexico',
    dialCode: '+52',
    code: 'MX'
  },
  {
    name: 'Micronesia, Federated States of Micronesia',
    dialCode: '+691',
    code: 'FM'
  },
  {
    name: 'Moldova',
    dialCode: '+373',
    code: 'MD'
  },
  {
    name: 'Monaco',
    dialCode: '+377',
    code: 'MC'
  },
  {
    name: 'Mongolia',
    dialCode: '+976',
    code: 'MN'
  },
  {
    name: 'Montenegro',
    dialCode: '+382',
    code: 'ME'
  },
  {
    name: 'Montserrat',
    dialCode: '+1664',
    code: 'MS'
  },
  {
    name: 'Morocco',
    dialCode: '+212',
    code: 'MA'
  },
  {
    name: 'Mozambique',
    dialCode: '+258',
    code: 'MZ'
  },
  {
    name: 'Myanmar',
    dialCode: '+95',
    code: 'MM'
  },
  {
    name: 'Namibia',
    dialCode: '+264',
    code: 'NA'
  },
  {
    name: 'Nauru',
    dialCode: '+674',
    code: 'NR'
  },
  {
    name: 'Nepal',
    dialCode: '+977',
    code: 'NP'
  },
  {
    name: 'Netherlands',
    dialCode: '+31',
    code: 'NL'
  },
  {
    name: 'Netherlands Antilles',
    dialCode: '+599',
    code: 'AN'
  },
  {
    name: 'New Caledonia',
    dialCode: '+687',
    code: 'NC'
  },
  {
    name: 'New Zealand',
    dialCode: '+64',
    code: 'NZ'
  },
  {
    name: 'Nicaragua',
    dialCode: '+505',
    code: 'NI'
  },
  {
    name: 'Niger',
    dialCode: '+227',
    code: 'NE'
  },
  {
    name: 'Nigeria',
    dialCode: '+234',
    code: 'NG'
  },
  {
    name: 'Niue',
    dialCode: '+683',
    code: 'NU'
  },
  {
    name: 'Norfolk Island',
    dialCode: '+672',
    code: 'NF'
  },
  {
    name: 'Northern Mariana Islands',
    dialCode: '+1670',
    code: 'MP'
  },
  {
    name: 'Norway',
    dialCode: '+47',
    code: 'NO'
  },
  {
    name: 'Oman',
    dialCode: '+968',
    code: 'OM'
  },
  {
    name: 'Pakistan',
    dialCode: '+92',
    code: 'PK'
  },
  {
    name: 'Palau',
    dialCode: '+680',
    code: 'PW'
  },
  {
    name: 'Palestinian Territory, Occupied',
    dialCode: '+970',
    code: 'PS'
  },
  {
    name: 'Panama',
    dialCode: '+507',
    code: 'PA'
  },
  {
    name: 'Papua New Guinea',
    dialCode: '+675',
    code: 'PG'
  },
  {
    name: 'Paraguay',
    dialCode: '+595',
    code: 'PY'
  },
  {
    name: 'Peru',
    dialCode: '+51',
    code: 'PE'
  },
  {
    name: 'Philippines',
    dialCode: '+63',
    code: 'PH'
  },
  {
    name: 'Pitcairn',
    dialCode: '+872',
    code: 'PN'
  },
  {
    name: 'Poland',
    dialCode: '+48',
    code: 'PL'
  },
  {
    name: 'Portugal',
    dialCode: '+351',
    code: 'PT'
  },
  {
    name: 'Puerto Rico',
    dialCode: '+1939',
    code: 'PR'
  },
  {
    name: 'Qatar',
    dialCode: '+974',
    code: 'QA'
  },
  {
    name: 'Romania',
    dialCode: '+40',
    code: 'RO'
  },
  {
    name: 'Russia',
    dialCode: '+7',
    code: 'RU'
  },
  {
    name: 'Rwanda',
    dialCode: '+250',
    code: 'RW'
  },
  {
    name: 'Reunion',
    dialCode: '+262',
    code: 'RE'
  },
  {
    name: 'Saint Barthelemy',
    dialCode: '+590',
    code: 'BL'
  },
  {
    name: 'Saint Helena, Ascension and Tristan Da Cunha',
    dialCode: '+290',
    code: 'SH'
  },
  {
    name: 'Saint Kitts and Nevis',
    dialCode: '+1869',
    code: 'KN'
  },
  {
    name: 'Saint Lucia',
    dialCode: '+1758',
    code: 'LC'
  },
  {
    name: 'Saint Martin',
    dialCode: '+590',
    code: 'MF'
  },
  {
    name: 'Saint Pierre and Miquelon',
    dialCode: '+508',
    code: 'PM'
  },
  {
    name: 'Saint Vincent and the Grenadines',
    dialCode: '+1784',
    code: 'VC'
  },
  {
    name: 'Samoa',
    dialCode: '+685',
    code: 'WS'
  },
  {
    name: 'San Marino',
    dialCode: '+378',
    code: 'SM'
  },
  {
    name: 'Sao Tome and Principe',
    dialCode: '+239',
    code: 'ST'
  },
  {
    name: 'Saudi Arabia',
    dialCode: '+966',
    code: 'SA'
  },
  {
    name: 'Senegal',
    dialCode: '+221',
    code: 'SN'
  },
  {
    name: 'Serbia',
    dialCode: '+381',
    code: 'RS'
  },
  {
    name: 'Seychelles',
    dialCode: '+248',
    code: 'SC'
  },
  {
    name: 'Sierra Leone',
    dialCode: '+232',
    code: 'SL'
  },
  {
    name: 'Singapore',
    dialCode: '+65',
    code: 'SG'
  },
  {
    name: 'Slovakia',
    dialCode: '+421',
    code: 'SK'
  },
  {
    name: 'Slovenia',
    dialCode: '+386',
    code: 'SI'
  },
  {
    name: 'Solomon Islands',
    dialCode: '+677',
    code: 'SB'
  },
  {
    name: 'Somalia',
    dialCode: '+252',
    code: 'SO'
  },
  {
    name: 'South Africa',
    dialCode: '+27',
    code: 'ZA'
  },
  {
    name: 'South Sudan',
    dialCode: '+211',
    code: 'SS'
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    dialCode: '+500',
    code: 'GS'
  },
  {
    name: 'Spain',
    dialCode: '+34',
    code: 'ES'
  },
  {
    name: 'Sri Lanka',
    dialCode: '+94',
    code: 'LK'
  },
  {
    name: 'Sudan',
    dialCode: '+249',
    code: 'SD'
  },
  {
    name: 'Suriname',
    dialCode: '+597',
    code: 'SR'
  },
  {
    name: 'Svalbard and Jan Mayen',
    dialCode: '+47',
    code: 'SJ'
  },
  {
    name: 'Swaziland',
    dialCode: '+268',
    code: 'SZ'
  },
  {
    name: 'Sweden',
    dialCode: '+46',
    code: 'SE'
  },
  {
    name: 'Switzerland',
    dialCode: '+41',
    code: 'CH'
  },
  {
    name: 'Syrian Arab Republic',
    dialCode: '+963',
    code: 'SY'
  },
  {
    name: 'Taiwan',
    dialCode: '+886',
    code: 'TW'
  },
  {
    name: 'Tajikistan',
    dialCode: '+992',
    code: 'TJ'
  },
  {
    name: 'Tanzania, United Republic of Tanzania',
    dialCode: '+255',
    code: 'TZ'
  },
  {
    name: 'Thailand',
    dialCode: '+66',
    code: 'TH'
  },
  {
    name: 'Timor-Leste',
    dialCode: '+670',
    code: 'TL'
  },
  {
    name: 'Togo',
    dialCode: '+228',
    code: 'TG'
  },
  {
    name: 'Tokelau',
    dialCode: '+690',
    code: 'TK'
  },
  {
    name: 'Tonga',
    dialCode: '+676',
    code: 'TO'
  },
  {
    name: 'Trinidad and Tobago',
    dialCode: '+1868',
    code: 'TT'
  },
  {
    name: 'Tunisia',
    dialCode: '+216',
    code: 'TN'
  },
  {
    name: 'Turkey',
    dialCode: '+90',
    code: 'TR'
  },
  {
    name: 'Turkmenistan',
    dialCode: '+993',
    code: 'TM'
  },
  {
    name: 'Turks and Caicos Islands',
    dialCode: '+1649',
    code: 'TC'
  },
  {
    name: 'Tuvalu',
    dialCode: '+688',
    code: 'TV'
  },
  {
    name: 'Uganda',
    dialCode: '+256',
    code: 'UG'
  },
  {
    name: 'Ukraine',
    dialCode: '+380',
    code: 'UA'
  },
  {
    name: 'United Arab Emirates',
    dialCode: '+971',
    code: 'AE'
  },
  {
    name: 'United Kingdom',
    dialCode: '+44',
    code: 'GB'
  },
  {
    name: 'United States',
    dialCode: '+1',
    code: 'US'
  },
  {
    name: 'Uruguay',
    dialCode: '+598',
    code: 'UY'
  },
  {
    name: 'Uzbekistan',
    dialCode: '+998',
    code: 'UZ'
  },
  {
    name: 'Vanuatu',
    dialCode: '+678',
    code: 'VU'
  },
  {
    name: 'Venezuela, Bolivarian Republic of Venezuela',
    dialCode: '+58',
    code: 'VE'
  },
  {
    name: 'Vietnam',
    dialCode: '+84',
    code: 'VN'
  },
  {
    name: 'Virgin Islands, British',
    dialCode: '+1284',
    code: 'VG'
  },
  {
    name: 'Virgin Islands, U.S.',
    dialCode: '+1340',
    code: 'VI'
  },
  {
    name: 'Wallis and Futuna',
    dialCode: '+681',
    code: 'WF'
  },
  {
    name: 'Yemen',
    dialCode: '+967',
    code: 'YE'
  },
  {
    name: 'Zambia',
    dialCode: '+260',
    code: 'ZM'
  },
  {
    name: 'Zimbabwe',
    dialCode: '+263',
    code: 'ZW'
  }
];
