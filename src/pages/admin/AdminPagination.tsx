import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

interface AdminPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  /** Singulier du libellé compté, ex. "entrée" (défaut), "certificat", "participant" */
  itemLabel?: string;
}

/** Construit la liste des numéros de page à afficher, avec ellipses au-delà de 2 pages voisines. */
function buildPageList(current: number, total: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const neighbours = new Set<number>([1, total, current, current - 1, current + 1]);
  let prev = 0;
  for (let p = 1; p <= total; p++) {
    if (!neighbours.has(p)) continue;
    if (prev && p - prev > 1) pages.push('ellipsis');
    pages.push(p);
    prev = p;
  }
  return pages;
}

const linkBase = 'h-8 min-w-8 px-2.5 font-opensans text-sm font-medium border transition-colors cursor-pointer select-none';
const linkNeutral = 'border-slate-200 bg-white text-slate-600 hover:bg-primary/10 hover:text-primary hover:border-primary/30';
const linkActive = 'border-primary bg-primary text-white hover:bg-primary hover:text-white';
const linkDisabled = 'pointer-events-none opacity-40';

const AdminPagination = ({ page, totalPages, totalItems, onPageChange, itemLabel = 'entrée' }: AdminPaginationProps) => {
  if (totalPages <= 1) return null;
  const pages = buildPageList(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <p className="text-sm text-slate-500 font-opensans">
        Page <span className="font-semibold text-slate-700">{page}</span> sur {totalPages}
        <span className="mx-1.5 text-slate-300">·</span>
        {totalItems} {itemLabel}
        {totalItems !== 1 ? 's' : ''}
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-1.5">
          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Page précédente"
              className={cn(linkBase, 'px-0 w-8', page <= 1 ? linkDisabled : linkNeutral)}
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) onPageChange(page - 1);
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>

          {pages.map((p, i) =>
            p === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${i}`}>
                <PaginationEllipsis className="h-8 w-8 text-slate-400" />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  aria-label={`Page ${p}`}
                  className={cn(linkBase, 'justify-center', p === page ? linkActive : linkNeutral)}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationLink
              href="#"
              aria-label="Page suivante"
              className={cn(linkBase, 'px-0 w-8', page >= totalPages ? linkDisabled : linkNeutral)}
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) onPageChange(page + 1);
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminPagination;
