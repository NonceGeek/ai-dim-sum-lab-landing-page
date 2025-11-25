
type DataItem = {
  size: string;
  unit: string;
};

type MainData = {
  id: number;
  system_name: string;
  data: {
    [key: string]: DataItem;
  };
  created_at: string;
  updated_at: string;
};

export default async function Stats() {
  let data: MainData | null = null;
  
  try {
    const res = await fetch('https://backend.aidimsum.com/main_data', { 
      next: { revalidate: 3600 } 
    });
    
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        data = json[0];
      }
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  }

  if (!data) return null;

  // Order matching the source requirements
  const keys = [
    '文本资料',
    '音视频资料',
    '图片资料',
    '语料集数量',
    '应用数量',
    '总数据规模'
  ];

  return (
    <section id="stats" className="py-12 relative animate-fade-in-up">
      <br></br><br></br><br></br><br></br>
      <div className="text-center mb-10">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 tech-heading bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">
          数据情况
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full opacity-80"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {keys.map((key, index) => {
          const item = data?.data[key];
          if (!item) return null;
          
          return (
            <div 
              key={key} 
              className="bg-base-200/40 backdrop-blur-md p-4 rounded-2xl border border-base-content/5 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative gradient glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <h3 className="text-sm font-medium text-base-content/70 mb-2 group-hover:text-primary transition-colors relative z-10">
                {key}
              </h3>
              <div className="relative z-10">
                <p className="text-2xl sm:text-3xl font-bold text-primary font-mono-tech tracking-tight flex items-baseline">
                  {item.size}
                  <span className="text-lg ml-0.5 opacity-80 text-secondary">+</span>
                </p>
                <p className="text-xs text-base-content/50 mt-1 font-medium">
                  {item.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <br></br><br></br><br></br><br></br>
    </section>
  );
}
