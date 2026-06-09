import React from 'react';
import { Stethoscope, FlaskConical, ScanLine, Monitor, ClipboardList, Heart } from 'lucide-react';

const ICONS = {
  stethoscope: Stethoscope,
  flask: FlaskConical,
  scan: ScanLine,
  monitor: Monitor,
  clipboard: ClipboardList,
  heart: Heart,
};

const ServiceIcon = ({ name, size = 24 }) => {
  const Icon = ICONS[name] || Heart;
  return <Icon size={size} />;
};

export default ServiceIcon;
