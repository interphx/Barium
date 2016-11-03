import {EntityManager} from 'entity';
import {ComponentClass} from 'component';
import * as Aspect from 'aspect';

// TODO: Add test for 64+ component classes
@ComponentClass
class TestComponent {
  constructor(public foo: string) {}
};
@ComponentClass
class TestFlagComponent0 {
  constructor() {}
};
@ComponentClass
class TestFlagComponent1 {
  constructor() {}
};

export function test(): void {
  describe('EntityManager', () => {
    it('should be created', () => {
      var em = new EntityManager();
      expect(em).toBeDefined();
    });
    it('should create entities', () => {
      var em = new EntityManager();
      var id_a = em.create();
      var id_b = em.create();
      var ent_c = em.createEntity();
      expect(id_a).toBeDefined();
      expect(id_b).toBeDefined();
      expect(ent_c).toBeDefined();
    });
    it('should consider created entities valid', () => {
      var em = new EntityManager();
      var id = em.create();
      expect(em.isValidId(id)).toBeTruthy();
    });
    it('should remove entities', () => {
      var em = new EntityManager();
      var id_a = em.create();
      var id_b = em.create();
      var ent_c = em.createEntity();

      em.remove(id_a);
      em.remove(id_b);
      em.removeEntity(ent_c);
      expect(em.isValidId(id_a)).toBeFalsy();
      expect(em.isValidId(id_b)).toBeFalsy();
      expect(em.isValidId(ent_c.id)).toBeFalsy();
    });
    it('should add components to entity', () => {
      var em = new EntityManager();
      var id0 = em.create(),
          id1 = em.create();
      expect(() => {
        em.addComponent(id0, new TestComponent('foo'));
        em.addComponent(id1, new TestComponent('bar'));
      }).not.toThrow();

      var comp0 = em.getComponent(id0, TestComponent);
      var comp1 = em.getComponent(id1, TestComponent);
      expect(comp0 ? comp0.foo : null).toEqual('foo');
      expect(comp1 ? comp1.foo : null).toEqual('bar');
    });
    it('should remove components from entity', () => {
      var em = new EntityManager();
      var id0 = em.create(),
          id1 = em.create();
      em.addComponent(id0, new TestComponent('foo'));
      em.addComponent(id1, new TestComponent('bar'));
      expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
      expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
      em.removeComponent(id0, TestComponent);
      em.removeComponent(id1, TestComponent);
      expect(em.hasComponent(id0, TestComponent)).toBeFalsy();
      expect(em.hasComponent(id1, TestComponent)).toBeFalsy();
    });
    it('should check if entity has component', () => {
      var em = new EntityManager();
      var id0 = em.create(),
          id1 = em.create();
      em.addComponent(id0, new TestComponent('foo'));
      em.addComponent(id1, new TestComponent('bar'));
      expect(em.hasComponent(id0, TestComponent)).toBeTruthy();
      expect(em.hasComponent(id1, TestComponent)).toBeTruthy();
    });
    it('should add aspects', () => {
      var em = new EntityManager();
      var id0 = em.create(),
          id1 = em.create();
      expect(() => {
        em.addAspect(Aspect.all([TestComponent]));
      }).not.toThrow();
    });
    it('should remove aspects', () => {
      var em = new EntityManager();
      var aspect = Aspect.all([TestComponent, TestFlagComponent0]);
      em.addAspect(aspect);
      expect(em.removeAspect(aspect)).toBeTruthy();
    });
    it('should return list of entities matching aspect', () => {
      var em = new EntityManager();
      var aspect0 = Aspect.all([TestComponent, TestFlagComponent0]);
      var aspect1 = Aspect.all([TestComponent, TestFlagComponent1]);
      em.addAspect(aspect0);
      em.addAspect(aspect1);
      var id0 = em.create(),
          id1 = em.create();
      em.addComponent(id0, new TestComponent('foo'));
      em.addComponent(id0, new TestFlagComponent0());
      em.addComponent(id1, new TestComponent('bar'));
      em.addComponent(id1, new TestFlagComponent1());
      expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
      expect(em.getEntitiesByAspect(aspect1)).toEqual([id1]);
      em.removeComponent(id1, TestComponent);
      expect(em.getEntitiesByAspect(aspect0)).toEqual([id0]);
      expect(em.getEntitiesByAspect(aspect1)).toEqual([]);
    });

  });
};
