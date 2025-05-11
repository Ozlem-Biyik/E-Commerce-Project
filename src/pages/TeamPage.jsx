import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

const TeamPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Gökhan Özdemir',
      role: 'Project Manager',
      image: 'https://media.licdn.com/dms/image/D4D03AQHYlJGUZUMwgA/profile-displayphoto-shrink_800_800/0/1700989952346?e=1719446400&v=beta&t=xDxJKvvbNrIGcVVZmvULcM6yvEFWV6Ht3_Vn-kQQQOE',
      bio: 'Tecrübeli bir proje yöneticisi olarak birçok başarılı e-ticaret projesine liderlik etmiştir. Müşteri odaklı yaklaşımı ve teknik bilgisiyle projeleri başarıyla yönetmektedir.',
      linkedin: 'https://www.linkedin.com/in/gokhan-ozdemir/',
      github: 'https://github.com/gokhanozdemir',
      email: 'gokhan@example.com'
    },
    {
      id: 2,
      name: 'Özlem Yıldız',
      role: 'Full Stack Developer',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Frontend ve backend teknolojilerinde uzman, modern web uygulamaları geliştirme konusunda deneyimli. React, Node.js ve veritabanı teknolojilerinde güçlü bilgi birikimine sahip.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ozlem@example.com'
    },
    {
      id: 3,
      name: 'Ahmet Yılmaz',
      role: 'UI/UX Designer',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Kullanıcı deneyimi tasarımında uzman, kullanılabilir ve estetik arayüzler oluşturmada yetenekli. Figma ve Adobe Creative Suite araçlarında uzmanlaşmış.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ahmet@example.com'
    },
    {
      id: 4,
      name: 'Ayşe Kaya',
      role: 'Backend Developer',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Veritabanı tasarımı ve API geliştirme konusunda uzman. Node.js, Express ve SQL/NoSQL veritabanlarında güçlü deneyime sahip.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'ayse@example.com'
    },
    {
      id: 5,
      name: 'Mehmet Can',
      role: 'Frontend Developer',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Modern frontend teknolojilerinde uzmanlaşmış, React ve TailwindCSS konusunda derin bilgiye sahip. Kullanıcı dostu arayüzler geliştirmede yetenekli.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mehmet@example.com'
    },
    {
      id: 6,
      name: 'Zeynep Demir',
      role: 'QA Engineer',
      image: 'https://randomuser.me/api/portraits/women/90.jpg',
      bio: 'Test otomasyonu ve kalite güvencesi konusunda deneyimli. Selenium ve Cypress gibi araçlarla kapsamlı test senaryoları oluşturmada uzman.',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'zeynep@example.com'
    }
  ];

  return (
    <div className="pb-16">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500">
          <a href="/" className="hover:text-blue-600">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Ekibimiz</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ekibimizle Tanışın</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          E-ticaret platformumuzu geliştiren yetenekli profesyonellerden oluşan ekibimiz, 
          size en iyi alışveriş deneyimini sunmak için çalışıyor.
        </p>
      </div>

      {/* Team Grid - Responsive: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-blue-200">{member.role}</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{member.bio}</p>
              
              <div className="flex space-x-4">
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Our Team Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ekibimize Katılın</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Yetenekli ve tutkulu profesyoneller arıyoruz. Eğer e-ticaret dünyasında fark yaratmak istiyorsanız, 
          bize katılın ve geleceği birlikte şekillendirelim.
        </p>
        <a 
          href="/contact" 
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300"
        >
          Açık Pozisyonlar
        </a>
      </div>
    </div>
  );
};

export default TeamPage; 