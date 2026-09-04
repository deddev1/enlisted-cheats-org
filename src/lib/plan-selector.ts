function applyPlanSelection(root: HTMLElement, plan: HTMLElement) {
	const buyBtn = root.querySelector<HTMLAnchorElement>('[data-plan-buy]');
	const plans = root.querySelectorAll<HTMLElement>('[data-plan]');
	const label = plan.dataset.planLabel ?? '';
	const price = plan.dataset.planPrice ?? '';
	const checkoutUrl = plan.dataset.checkoutUrl ?? buyBtn?.href ?? '';

	plans.forEach((item) => {
		const selected = item === plan;
		item.classList.toggle('is-selected', selected);
		item.setAttribute('aria-pressed', selected ? 'true' : 'false');
	});

	root.querySelectorAll<HTMLElement>('[data-plan-summary-panel]').forEach((panel) => {
		panel.classList.toggle('is-active', panel.dataset.planSummaryPanel === plan.dataset.plan);
	});

	if (buyBtn && checkoutUrl) {
		buyBtn.href = checkoutUrl;
		const buyLabel = buyBtn.querySelector('[data-plan-buy-label]');
		const prefix = root.dataset.buyPrefix ?? 'Buy Now';
		const showPrice = root.dataset.buyShowPrice !== 'false';
		const text = showPrice && price ? `${prefix} — $${price}` : prefix;
		if (buyLabel) {
			buyLabel.textContent = text;
		} else {
			buyBtn.textContent = text;
		}
	}
}

export function initPlanSelectors() {
	document.querySelectorAll<HTMLElement>('[data-plan-selector]').forEach((root) => {
		if (root.dataset.planSelectorReady === 'true') return;
		root.dataset.planSelectorReady = 'true';

		const plans = root.querySelectorAll<HTMLElement>('[data-plan]');
		if (!plans.length) return;

		plans.forEach((plan) => {
			plan.addEventListener('click', () => {
				applyPlanSelection(root, plan);
			});

			plan.addEventListener('dblclick', () => {
				const checkoutUrl = plan.dataset.checkoutUrl;
				if (checkoutUrl) {
					window.location.href = checkoutUrl;
				}
			});
		});

		const defaultId = root.dataset.defaultPlan;
		const defaultPlan =
			(defaultId && root.querySelector<HTMLElement>(`[data-plan="${defaultId}"]`)) ?? plans[0];
		if (defaultPlan) {
			applyPlanSelection(root, defaultPlan);
		}
	});
}

if (typeof document !== 'undefined') {
	document.addEventListener('astro:page-load', initPlanSelectors);
	document.addEventListener('DOMContentLoaded', initPlanSelectors);
}
