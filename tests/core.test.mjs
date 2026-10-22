/** Core contracts exercised without DOM or WebGL. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Object3D, Mesh, BoxGeometry, MeshBasicMaterial, Texture } from 'three';
import { SceneDocument } from '../src/core/SceneDocument.ts';
import { ToolRegistry } from '../src/core/ToolRegistry.ts';
import { disposeObjects } from '../src/core/disposeObjects.ts';
test('document publishes add/remove, returns snapshots, and supports unsubscribe', () => {
  const document = new SceneDocument();
  const object = new Object3D();
  let changes = 0;
  const off = document.subscribe(() => changes++);
  const before = document.objects;
  document.add(object);
  assert.equal(before.length, 0);
  assert.equal(changes, 1);
  assert.throws(() => document.add(object), /parent/);
  assert.equal(document.remove('missing'), undefined);
  assert.equal(changes, 1);
  assert.equal(document.remove(object.uuid), object);
  assert.equal(object.parent, null);
  off(); document.add(object);
  assert.equal(changes, 2);
  assert.throws(() => document.add(document.root), /cycle/);
});
test('tools execute against a shared document and reject duplicate/unknown ids', () => {
  const registry = new ToolRegistry();
  const document = new SceneDocument();
  const tool = { id: 'example', label: 'Example', run: ({ document }) => document.add(new Object3D()) };
  const unregister = registry.register(tool);
  tool.id = 'mutated';
  assert.throws(() => registry.register({ ...tool, id: 'example' }), /Duplicate/);
  registry.execute('example', { document });
  assert.equal(document.objects.length, 1);
  unregister();
  assert.throws(() => registry.execute('example', { document }), /Unknown/);
  registry.register({ ...tool, id: 'example' });
  unregister();
  assert.equal(registry.entries.length, 1);
});
test('resource cleanup deduplicates shared resources across objects', () => {
  const geometry = new BoxGeometry();
  const texture = new Texture();
  const material = new MeshBasicMaterial({ map: texture });
  let disposed = 0;
  for (const resource of [geometry, material, texture]) resource.addEventListener('dispose', () => disposed++);
  disposeObjects([new Mesh(geometry, material), new Mesh(geometry, material)]);
  assert.equal(disposed, 3);
});

import { normalizeSearch } from '../src/catalog.ts';
test('Vietnamese catalog search handles accents, case, spaces, and đ', () => {
  assert.equal(normalizeSearch('  HÌNH CẦU  '), normalizeSearch('hinh cau'));
  assert.equal(normalizeSearch('Đối tượng'), 'doi tuong');
});
