

#----------------------------------------------------------------------------------
# Variables
#----------------------------------------------------------------------------------

VERSION := 0.0.1
UI_ROOT_DIR := projects/ui

#----------------------------------------------------------------------------------
# Targets
#----------------------------------------------------------------------------------

.PHONY: clean
clean:
	rm -rf $(UI_ROOT_DIR)/node_modules

.PHONY: install-tools
install-tools: update-ui-deps

.PHONY: update-ui-deps
update-ui-deps:
	yarn --cwd=$(UI_ROOT_DIR) install

.PHONY: run-ui
run-ui: update-ui-deps
	VITE_UI_VERSION=$(VERSION) yarn --cwd=$(UI_ROOT_DIR) start

.PHONY: run-storybook
run-storybook: 
	VITE_UI_VERSION=$(VERSION) yarn --cwd=$(UI_ROOT_DIR) storybook

.PHONY: build-ui
build-ui: update-ui-deps
	VITE_UI_VERSION=$(VERSION) yarn --cwd=$(UI_ROOT_DIR) build

.PHONY: preview-ui
preview-ui: update-ui-deps
	VITE_UI_VERSION=$(VERSION) yarn --cwd=$(UI_ROOT_DIR) preview

.PHONY: build-ui-image
build-ui-image: build-ui
	docker build --no-cache -t $(IMAGE_NAME) .

.PHONY: lint-ui-code
lint-ui-code: update-ui-deps
	yarn tsc --cwd=$(UI_ROOT_DIR) && yarn --cwd=$(UI_ROOT_DIR) lint --max-warnings=0