import React, { useEffect, useRef } from 'react';

// Minimal Excel-like viewer/editor using Luckysheet via CDN (no bundler issues)
// Usage:
// <ExcelViewer templateUrl="/lib/Documentos/mi_plantilla.xlsx" onReady={() => {}} />
// NOTE: This loads scripts/styles at runtime and initializes a single sheet.

interface ExcelViewerProps {
  templateUrl?: string;
  height?: number | string;
  width?: number | string;
  onReady?: () => void;
}

declare global {
  interface Window {
    luckysheet?: any;
  }
}

const LUCKYSHEET_CSS = 'https://cdn.jsdelivr.net/npm/luckysheet@2.1.13/dist/plugins/css/plugins.css';
const LUCKYSHEET_CSS2 = 'https://cdn.jsdelivr.net/npm/luckysheet@2.1.13/dist/plugins/plugins.css';
const LUCKYSHEET_CSS3 = 'https://cdn.jsdelivr.net/npm/luckysheet@2.1.13/dist/css/luckysheet.css';
const JQUERY_JS = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
const LUCKYSHEET_JS = 'https://cdn.jsdelivr.net/npm/luckysheet@2.1.13/dist/luckysheet.umd.js';
const LUCKYEXCEL_JS = 'https://cdn.jsdelivr.net/npm/luckyexcel@1.1.0/dist/luckyexcel.umd.js';

export default function ExcelViewer({ templateUrl, height = 520, width = '100%', onReady }: ExcelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerIdRef = useRef<string>(`luckysheet-${Math.random().toString(36).slice(2)}`);

  // Inject CSS/JS only once
  useEffect(() => {
    const ensureLink = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };
    ensureLink(LUCKYSHEET_CSS);
    ensureLink(LUCKYSHEET_CSS2);
    ensureLink(LUCKYSHEET_CSS3);

    const ensureScript = (src: string) => new Promise<void>((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => resolve();
      document.body.appendChild(s);
    });

    let cancelled = false;
    (async () => {
      await ensureScript(JQUERY_JS);
      await ensureScript(LUCKYSHEET_JS);
      await ensureScript(LUCKYEXCEL_JS);
      if (cancelled) return;

      // Base config
      const options: any = {
        container: containerIdRef.current,
        title: 'Hoja',
        lang: 'es',
        showinfobar: false,
        allowEdit: true,
        showsheetbarConfig: {
          add: false,
          menu: false,
        },
        showtoolbarConfig: {
          image: false,
        },
        data: [
          {
            name: 'Hoja1',
            index: 0,
            status: 1,
            order: 0,
            row: 80,
            column: 26,
            celldata: [],
          },
        ],
      };

      // If template provided, try to load it via fetch + xlsx import inside luckysheet
      // For simplicity, we leave template preloading for next step (we can map fields later)

      if (templateUrl) {
        try {
          const LuckyExcel = (window as any).LuckyExcel;
          if (LuckyExcel) {
            const url = encodeURI(templateUrl);
            LuckyExcel.transformExcelToLuckyByUrl(url, '', (exportJson: any) => {
              if (!exportJson.sheets || exportJson.sheets.length === 0) {
                window.luckysheet?.create(options);
                try { window.luckysheet?.resize(); } catch {}
                onReady?.();
                return;
              }
              window.luckysheet?.create({
                container: options.container,
                lang: options.lang,
                showinfobar: options.showinfobar,
                showsheetbarConfig: options.showsheetbarConfig,
                showtoolbarConfig: options.showtoolbarConfig,
                data: exportJson.sheets,
                title: exportJson.info?.name || 'Hoja',
                userInfo: exportJson.info?.nameCreator || '',
              });
              // Forzar ajuste al primer render
              setTimeout(() => { try { window.luckysheet?.resize(); } catch {} }, 50);
              onReady?.();
            });
          } else {
            window.luckysheet?.create(options);
            try { window.luckysheet?.resize(); } catch {}
            onReady?.();
          }
        } catch (e) {
          console.warn('No se pudo cargar la plantilla de Excel:', e);
          window.luckysheet?.create(options);
          try { window.luckysheet?.resize(); } catch {}
          onReady?.();
        }
      } else {
        window.luckysheet?.create(options);
        try { window.luckysheet?.resize(); } catch {}
        onReady?.();
      }
    })();

    const onResize = () => {
      try {
        window.luckysheet?.resize();
      } catch {}
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
    };
  }, [onReady]);

  return (
    <div style={{ width, margin: '0 auto' }}>
      <div
        id={containerIdRef.current}
        ref={containerRef}
        style={{ width: '100%', height: typeof height === 'number' ? `${height}px` : height, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'auto', pointerEvents: 'auto' }}
      />
      {!templateUrl && (
        <div className="text-xs text-slate-500 mt-1">Sin plantilla. Proporcione templateUrl para cargar un Excel.</div>
      )}
    </div>
  );
}
