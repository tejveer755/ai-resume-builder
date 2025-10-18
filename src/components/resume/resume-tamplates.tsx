// components/resume/resume-templates.tsx
import { UserProfile } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';

export interface ResumeTemplateProps {
  profile: UserProfile;
}

// Template 1: Classic Professional
export function ClassicTemplate({ profile }: ResumeTemplateProps) {
  return (
    <div className="bg-white text-black p-12 min-h-[297mm]">
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gray-800 pb-6">
        <h1 className="text-5xl font-bold mb-2 tracking-tight">{profile.basicInfo.name}</h1>
        <p className="text-xl text-gray-600 mb-4 font-medium">{profile.basicInfo.title}</p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {profile.basicInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {profile.basicInfo.email}
            </div>
          )}
          {profile.basicInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {profile.basicInfo.phone}
            </div>
          )}
          {profile.basicInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {profile.basicInfo.location}
            </div>
          )}
        </div>

        {(profile.socials.linkedin || profile.socials.github || profile.socials.portfolio) && (
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
            {profile.socials.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                {profile.socials.linkedin}
              </div>
            )}
            {profile.socials.github && (
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                {profile.socials.github}
              </div>
            )}
            {profile.socials.portfolio && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {profile.socials.portfolio}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {profile.summary && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {profile.experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <p className="text-gray-600 text-sm whitespace-nowrap">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">Education</h2>
          <div className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                    {edu.grade && <p className="text-gray-600">Grade: {edu.grade}</p>}
                  </div>
                  <p className="text-gray-600 text-sm whitespace-nowrap">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                </div>
                {edu.description && <p className="text-gray-700 whitespace-pre-line">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hackathons */}
      {profile.hackathons && profile.hackathons.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">
            Hackathons & Projects
          </h2>
          <div className="space-y-4">
            {profile.hackathons.map((hack) => (
              <div key={hack.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold">{hack.projectName}</h3>
                    <p className="text-gray-700">{hack.eventName} {hack.role && `• ${hack.role}`}</p>
                    {hack.award && <p className="text-gray-600 italic">🏆 {hack.award}</p>}
                  </div>
                  {hack.date && <p className="text-gray-600 text-sm">{hack.date}</p>}
                </div>
                <p className="text-gray-700 mb-2">{hack.description}</p>
                {hack.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-gray-600 font-medium">Technologies:</span>
                    {hack.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold border-b-2 border-gray-800 pb-2 mb-3 uppercase tracking-wide">
            Achievements
          </h2>
          <div className="space-y-3">
            {profile.achievements.map((ach) => (
              <div key={ach.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold">{ach.title}</h3>
                    <p className="text-gray-700 text-sm">{ach.description}</p>
                  </div>
                  {ach.date && <p className="text-gray-600 text-sm ml-4">{ach.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Template 2: Modern Minimal
export function ModernTemplate({ profile }: ResumeTemplateProps) {
  return (
    <div className="bg-white text-black p-12 min-h-[297mm]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-6xl font-light mb-1 text-gray-900">{profile.basicInfo.name}</h1>
        <p className="text-2xl text-gray-500 mb-6 font-light">{profile.basicInfo.title}</p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
          {profile.basicInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              <span>{profile.basicInfo.email}</span>
            </div>
          )}
          {profile.basicInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              <span>{profile.basicInfo.phone}</span>
            </div>
          )}
          {profile.basicInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span>{profile.basicInfo.location}</span>
            </div>
          )}
          {profile.socials.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate">{profile.socials.linkedin}</span>
            </div>
          )}
          {profile.socials.github && (
            <div className="flex items-center gap-2">
              <Github className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate">{profile.socials.github}</span>
            </div>
          )}
          {profile.socials.portfolio && (
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <span className="truncate">{profile.socials.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-300 mb-8"></div>

      {/* Summary */}
      {profile.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">About</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{profile.summary}</p>
        </div>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-gray-200">
                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-gray-900 rounded-full"></div>
                <div className="mb-1">
                  <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-sm text-gray-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Education</h2>
          <div className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-base font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-sm text-gray-600">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                <p className="text-xs text-gray-500">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                {edu.grade && <p className="text-xs text-gray-600 mt-1">Grade: {edu.grade}</p>}
                {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span key={skill.id} className="text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hackathons */}
      {profile.hackathons && profile.hackathons.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest">Projects</h2>
          <div className="space-y-4">
            {profile.hackathons.map((hack) => (
              <div key={hack.id}>
                <h3 className="text-base font-semibold text-gray-900">{hack.projectName}</h3>
                <p className="text-sm text-gray-600">{hack.eventName} {hack.role && `• ${hack.role}`}</p>
                {hack.award && <p className="text-xs text-gray-500 italic">🏆 {hack.award}</p>}
                <p className="text-sm text-gray-700 mt-1">{hack.description}</p>
                {hack.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {hack.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {hack.projectLink && (
                  <p className="text-xs text-gray-500 mt-1 truncate">Link: {hack.projectLink}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-widest">Achievements</h2>
          <ul className="space-y-2">
            {profile.achievements.map((ach) => (
              <li key={ach.id} className="text-sm text-gray-700">
                <span className="font-semibold">{ach.title}</span> - {ach.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Template 3: Two Column
export function TwoColumnTemplate({ profile }: ResumeTemplateProps) {
  return (
    <div className="bg-white text-black flex min-h-[297mm]">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-900 text-white p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 leading-tight">{profile.basicInfo.name}</h1>
          <p className="text-lg text-gray-300">{profile.basicInfo.title}</p>
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-sm font-bold mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">Contact</h2>
          <div className="space-y-3 text-sm">
            {profile.basicInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">{profile.basicInfo.email}</span>
              </div>
            )}
            {profile.basicInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{profile.basicInfo.phone}</span>
              </div>
            )}
            {profile.basicInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{profile.basicInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        {(profile.socials.linkedin || profile.socials.github || profile.socials.portfolio) && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">Links</h2>
            <div className="space-y-3 text-sm">
              {profile.socials.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{profile.socials.linkedin}</span>
                </div>
              )}
              {profile.socials.github && (
                <div className="flex items-start gap-2">
                  <Github className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{profile.socials.github}</span>
                </div>
              )}
              {profile.socials.portfolio && (
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="break-all">{profile.socials.portfolio}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {profile.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-gray-800 px-2 py-1 rounded">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {profile.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold mb-4 uppercase tracking-wide border-b border-gray-700 pb-2">Education</h2>
            <div className="space-y-4 text-sm">
              {profile.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="text-gray-300 text-xs">{edu.field}</p>
                  <p className="text-gray-400 text-xs">{edu.institution}</p>
                  <p className="text-gray-500 text-xs mt-1">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                  {edu.grade && <p className="text-gray-400 text-xs">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-[65%] p-8">
        {/* Summary */}
        {profile.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-900 border-b-2 border-gray-900 pb-2">Profile</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{profile.summary}</p>
          </div>
        )}

        {/* Experience */}
        {profile.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-gray-900 pb-2">Experience</h2>
            <div className="space-y-5">
              {profile.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-sm text-gray-600">{exp.company} {exp.location && `• ${exp.location}`}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hackathons & Projects */}
        {profile.hackathons && profile.hackathons.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-gray-900 pb-2">Projects</h2>
            <div className="space-y-4">
              {profile.hackathons.map((hack) => (
                <div key={hack.id}>
                  <h3 className="text-base font-bold text-gray-900">{hack.projectName}</h3>
                  <p className="text-sm text-gray-600">{hack.eventName} {hack.role && `• ${hack.role}`}</p>
                  {hack.award && <p className="text-xs text-gray-500 italic">🏆 {hack.award}</p>}
                  <p className="text-sm text-gray-700 mt-1">{hack.description}</p>
                  {hack.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {hack.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {hack.projectLink && (
                    <p className="text-xs text-gray-500 mt-1 truncate">Link: {hack.projectLink}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {profile.achievements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-900 border-b-2 border-gray-900 pb-2">Achievements</h2>
            <ul className="space-y-2 list-disc list-inside">
              {profile.achievements.map((ach) => (
                <li key={ach.id} className="text-sm text-gray-700">
                  <span className="font-semibold">{ach.title}</span>: {ach.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Template 4: Creative Bold
export function CreativeTemplate({ profile }: ResumeTemplateProps) {
  return (
    <div className="bg-white text-black p-12 min-h-[297mm]">
      {/* Header with Accent */}
      <div className="relative mb-10">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 -z-10"></div>
        <div className="pt-8 pl-8">
          <h1 className="text-5xl font-black mb-2 text-gray-900 tracking-tight">{profile.basicInfo.name}</h1>
          <p className="text-2xl text-gray-600 font-light italic">{profile.basicInfo.title}</p>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="bg-gray-100 px-6 py-4 mb-8 rounded-lg">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
          {profile.basicInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{profile.basicInfo.email}</span>
            </div>
          )}
          {profile.basicInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{profile.basicInfo.phone}</span>
            </div>
          )}
          {profile.basicInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{profile.basicInfo.location}</span>
            </div>
          )}
          {profile.socials.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-gray-500" />
              <span className="truncate">{profile.socials.linkedin}</span>
            </div>
          )}
          {profile.socials.github && (
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-gray-500" />
              <span className="truncate">{profile.socials.github}</span>
            </div>
          )}
          {profile.socials.portfolio && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="truncate">{profile.socials.portfolio}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {profile.summary && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">ABOUT ME</h2>
          </div>
          <p className="text-gray-700 leading-relaxed ml-5">{profile.summary}</p>
        </div>
      )}

      {/* Skills */}
      {profile.skills.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">SKILLS</h2>
          </div>
          <div className="flex flex-wrap gap-2 ml-5">
            {profile.skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-semibold"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {profile.experience.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">EXPERIENCE</h2>
          </div>
          <div className="space-y-5 ml-5">
            {profile.experience.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-5 top-1 w-3 h-3 bg-gray-900 rounded-full"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-base text-gray-600 font-semibold">{exp.company} {exp.location && `• ${exp.location}`}</p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {profile.education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">EDUCATION</h2>
          </div>
          <div className="space-y-4 ml-5">
            {profile.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-base text-gray-600 font-semibold">{edu.institution} {edu.location && `• ${edu.location}`}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                {edu.grade && <p className="text-sm text-gray-600 mt-1">Grade: {edu.grade}</p>}
                {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hackathons */}
      {profile.hackathons && profile.hackathons.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">PROJECTS</h2>
          </div>
          <div className="space-y-4 ml-5">
            {profile.hackathons.map((hack) => (
              <div key={hack.id}>
                <h3 className="text-lg font-bold text-gray-900">{hack.projectName}</h3>
                <p className="text-base text-gray-600">{hack.eventName} {hack.role && `• ${hack.role}`}</p>
                {hack.award && <p className="text-sm text-gray-500 italic">🏆 {hack.award}</p>}
                <p className="text-gray-700 mt-1">{hack.description}</p>
                {hack.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hack.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {hack.projectLink && (
                  <p className="text-xs text-gray-500 mt-1 truncate">Link: {hack.projectLink}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {profile.achievements.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gray-900"></div>
            <h2 className="text-2xl font-black text-gray-900">ACHIEVEMENTS</h2>
          </div>
          <div className="space-y-2 ml-5">
            {profile.achievements.map((ach) => (
              <div key={ach.id} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-bold text-gray-900">{ach.title}</span>
                  <span className="text-gray-700"> - {ach.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Export template registry for easy access
export const RESUME_TEMPLATES = {
  classic: {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional format with clean lines and professional styling',
    component: ClassicTemplate,
    preview: '/templates/classic-preview.png',
  },
  modern: {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Sleek and contemporary design with timeline elements',
    component: ModernTemplate,
    preview: '/templates/modern-preview.png',
  },
  twocolumn: {
    id: 'twocolumn',
    name: 'Two Column',
    description: 'Efficient layout with sidebar for contact and skills',
    component: TwoColumnTemplate,
    preview: '/templates/twocolumn-preview.png',
  },
  creative: {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design with bold typography and accents',
    component: CreativeTemplate,
    preview: '/templates/creative-preview.png',
  },
} as const;

export type TemplateId = keyof typeof RESUME_TEMPLATES;
