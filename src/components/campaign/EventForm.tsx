import React, { useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  Users,
  MousePointerClick,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import gsap from 'gsap';
import { CampaignFormData } from '../../types/campaign';
import { ImageUpload } from './ImageUpload';
import { BrandSettings } from './BrandSettings';

interface EventFormProps {
  formData: CampaignFormData;
  errors: {
    name?: string;
    description?: string;
  };
  isGenerating: boolean;
  onUpdateField: <K extends keyof CampaignFormData>(field: K, value: CampaignFormData[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  formData,
  errors,
  isGenerating,
  onUpdateField,
  onSubmit,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      onUpdateField('description', val);
    }
  };

  const handlePosterSelected = (
    dataUrl: string,
    file: File,
    fileName: string,
    fileSize: number
  ) => {
    onUpdateField('posterDataUrl', dataUrl);
    onUpdateField('posterFile', file);
    onUpdateField('posterFileName', fileName);
    onUpdateField('posterFileSize', fileSize);
  };

  const handlePosterRemoved = () => {
    onUpdateField('posterDataUrl', null);
    onUpdateField('posterFile', null);
    onUpdateField('posterFileName', null);
    onUpdateField('posterFileSize', null);
  };

  const handleLogoSelected = (
    dataUrl: string,
    file: File,
    fileName: string,
    fileSize: number
  ) => {
    onUpdateField('logoDataUrl', dataUrl);
    onUpdateField('logoFile', file);
    onUpdateField('logoFileName', fileName);
    onUpdateField('logoFileSize', fileSize);
  };

  const handleLogoRemoved = () => {
    onUpdateField('logoDataUrl', null);
    onUpdateField('logoFile', null);
    onUpdateField('logoFileName', null);
    onUpdateField('logoFileSize', null);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* 1. Core Event Details Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7C3AED] flex items-center justify-center font-bold text-sm">
            01
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Event Details
            </h3>
            <p className="text-xs text-[#64748B]">
              Provide essential information about your event.
            </p>
          </div>
        </div>

        {/* Event Name * */}
        <div className="space-y-1.5" id="field-name">
          <label
            htmlFor="eventName"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Event Name <span className="text-[#7C3AED]">*</span>
          </label>
          <input
            id="eventName"
            ref={nameInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => onUpdateField('name', e.target.value)}
            placeholder="e.g. AI Hackathon 2026"
            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all ${
              errors.name
                ? 'border-rose-500 bg-rose-50/20 focus:border-rose-600 focus:ring-1 focus:ring-rose-500'
                : 'border-[#E2E8F0] bg-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
            } focus:outline-hidden`}
          />
          {errors.name && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Event Description * with Character Counter */}
        <div className="space-y-1.5" id="field-description">
          <div className="flex items-center justify-between">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Event Description <span className="text-[#7C3AED]">*</span>
            </label>
            <span
              className={`text-xs font-mono font-medium ${
                formData.description.length >= 500
                  ? 'text-amber-600 font-bold'
                  : 'text-[#64748B]'
              }`}
            >
              {formData.description.length} / 500
            </span>
          </div>
          <textarea
            id="eventDescription"
            ref={descriptionTextareaRef}
            rows={4}
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder="Tell us what this event is about, what attendees will learn, speakers, and why they should join..."
            className={`w-full px-4 py-3 text-sm rounded-xl border transition-all ${
              errors.description
                ? 'border-rose-500 bg-rose-50/20 focus:border-rose-600 focus:ring-1 focus:ring-rose-500'
                : 'border-[#E2E8F0] bg-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]'
            } focus:outline-hidden resize-none`}
            maxLength={500}
          />
          {errors.description && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.description}</span>
            </div>
          )}
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="eventDate"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Event Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="eventDate"
                type="text"
                value={formData.date}
                onChange={(e) => onUpdateField('date', e.target.value)}
                placeholder="e.g. 15 October 2026"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="eventTime"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Event Time
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="eventTime"
                type="text"
                value={formData.time}
                onChange={(e) => onUpdateField('time', e.target.value)}
                placeholder="e.g. 10:00 AM"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
          </div>
        </div>

        {/* Venue */}
        <div className="space-y-1.5">
          <label
            htmlFor="eventVenue"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Venue
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="eventVenue"
              type="text"
              value={formData.venue}
              onChange={(e) => onUpdateField('venue', e.target.value)}
              placeholder="e.g. RK University, Auditorium Hall A"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
            />
          </div>
        </div>

        {/* Organizer & Target Audience Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              htmlFor="eventOrganizer"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Organizer / Organization
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="eventOrganizer"
                type="text"
                value={formData.organizer}
                onChange={(e) => onUpdateField('organizer', e.target.value)}
                placeholder="e.g. Tech Minds Club"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="targetAudience"
              className="block text-sm font-semibold text-[#0F172A]"
            >
              Target Audience
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="targetAudience"
                type="text"
                value={formData.audience}
                onChange={(e) => onUpdateField('audience', e.target.value)}
                placeholder="e.g. College Students, Developers"
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
              />
            </div>
          </div>
        </div>

        {/* Call To Action */}
        <div className="space-y-1.5">
          <label
            htmlFor="eventCta"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Call To Action
          </label>
          <div className="relative">
            <MousePointerClick className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="eventCta"
              type="text"
              value={formData.cta}
              onChange={(e) => onUpdateField('cta', e.target.value)}
              placeholder="e.g. Register Now, Grab Tickets"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white focus:outline-hidden focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]"
            />
          </div>
        </div>
      </div>

      {/* 2. Visual Assets Upload Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold text-sm">
            02
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">
              Visual Assets
            </h3>
            <p className="text-xs text-[#64748B]">
              Upload posters and logos for campaign cards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Event Poster Upload */}
          <ImageUpload
            label="Event Poster"
            helperText="PNG, JPG or WEBP · Max 5MB"
            aspectRatioClass="aspect-[16/9]"
            currentImage={formData.posterDataUrl}
            fileName={formData.posterFileName}
            fileSize={formData.posterFileSize}
            onImageSelected={handlePosterSelected}
            onImageRemoved={handlePosterRemoved}
          />

          {/* Organizer Logo Upload */}
          <ImageUpload
            label="Organizer Logo"
            helperText="PNG, JPG or WEBP · Transparent recommended"
            aspectRatioClass="aspect-[1/1] max-w-[200px] mx-auto"
            currentImage={formData.logoDataUrl}
            fileName={formData.logoFileName}
            fileSize={formData.logoFileSize}
            onImageSelected={handleLogoSelected}
            onImageRemoved={handleLogoRemoved}
          />
        </div>
      </div>

      {/* 3. Brand Settings Collapsible Section */}
      <BrandSettings
        primaryColor={formData.primaryColor}
        secondaryColor={formData.secondaryColor}
        organizationName={formData.organizer}
        socialHandle={formData.socialHandle}
        onPrimaryColorChange={(c) => onUpdateField('primaryColor', c)}
        onSecondaryColorChange={(c) => onUpdateField('secondaryColor', c)}
        onSocialHandleChange={(h) => onUpdateField('socialHandle', h)}
      />

      {/* Submit / Generate Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isGenerating}
          id="generate-campaign-btn"
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#0B1020] hover:bg-slate-800 shadow-xs transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Campaign...</span>
            </>
          ) : (
            <>
              <span>Generate Campaign</span>
              <span className="text-base text-[#7C3AED]">→</span>
            </>
          )}
        </button>
        <p className="text-center text-[11px] font-mono text-[#667085] mt-2">
          SAVED LOCALLY · PREPARES 6 PLATFORM SPECIFICATIONS
        </p>
      </div>
    </form>
  );
};
