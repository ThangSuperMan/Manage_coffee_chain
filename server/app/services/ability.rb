class Ability
  include CanCan::Ability

  def initialize(current_user)
    allow_anonymous_actions

    current_user ||= User.new
    if current_user.superadmin?
      can :manage, [
        User,
        Product
      ]
    elsif current_user.user?
      can :read, Bookmark
    end
  end

  def allow_anonymous_actions
    can :read, [
      Product,
    ]

    can :create, User do |user|
      user.user?
    end
  end
end
